let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let session = require('express-session');
let FileStore = require('session-file-store')(session);

let fsHandler = require('./common/fileHandler'); //文件处理器
let ApiTools = require('./common/apiTools');

let ErrorCode = require('./common/errorCode');


// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
//静态文件
// app.use('/', express.static('static'));

// //cors,处理跨域请求
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

let identityKey = 'shopkey';
app.use(session({
  name: identityKey,
  secret: 'onlineshop', // 用来对session id相关的cookie进行签名
  store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: true, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 2 * 3600 * 1000 // 有效期，单位是毫秒
  }
}));

app.use(function (req, res, next) {
  let arr = req.url.split('/');

  //去除get请求携带的参数
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split('?')[0];
  }
  if (req.session.username) {
    //用户登录过
    if (arr[1] === 'login') {
      res.redirect('/');
      res.end();
    }
    next();
  } else {
    //解析用户请求路径
    if (arr.length > 2) {
      if (arr[2] === 'login' || arr[2] === 'logout' || arr[2] === 'goods') {
        next();
      } else {
        console.log('intercept：用户未登录执行登录拦截，路径为：' + arr[2]);
        res.status(401);
        res.end();
      }
    }
  }
});


app.get('/api', function (req, res) {
  res.send('Hello World');
});

app.get('/api/goods', function (req, res) {
  fsHandler.getJson('goods.json').then(data => {
    let dataAry = JSON.parse(data);
    if (req.query.type == null) {
      res.json(ApiTools.getSucRtnData(dataAry));
    } else {
      let returnAry = dataAry.filter((item) => {
        // 暂时只有一个查询条件
        if (item.type == req.query.type) {
          return item;
        }
      })
      res.json(ApiTools.getSucRtnData(returnAry));
    }
  });
});

app.get('/api/goods/:id', function (req, res) {
  let id = req.params.id;
  fsHandler.getJson('goods.json').then(data => {
    let dataObj = JSON.parse(data);
    let findGood = dataObj.find((item) => {
      if (item.id == id) {
        return true;
      }
    })
    if (findGood != null) {
      res.send(ApiTools.getSucRtnData(findGood));
    } else {
      res.send(ApiTools.getSucRtnData(null));
    }
  });
});




function check(name, pass) {
  if (name == "admin" && pass == "123456") {
    return {
      name: name,
      password: pass
    };
  } else {
    return null;
  }
}

app.post('/api/login', function (req, res, next) {
  // var sess = req.session;
  var user = check(req.body.name, req.body.password);
  if (user) {
    req.session.regenerate(function (err) {
      if (err) {
        res.json(ApiTools.getFailRtnData(ErrorCode.login_error_1.code, ErrorCode.login_error_1.msg));
      }
      req.session.username = user.name;
      console.log("session.username:" + req.session.username);
      res.send(ApiTools.getSucRtnData(''));
    });
  } else {
    res.json(ApiTools.getFailRtnData(ErrorCode.login_error_1.code, ErrorCode.login_error_1.msg));
  }
});

// 退出登录
app.post('/api/logout', function (req, res, next) {
  // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
  // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
  // 然后去查找对应的 session 文件，报错
  // session-file-store 本身的bug    
  console.log("session.username:" + req.session.username);
  req.session.destroy(function (err) {
    if (err) {
      res.json(ApiTools.getFailRtnData(ErrorCode.login_error_3.code, ErrorCode.login_error_3.msg));
      return;
    }

    // req.session.loginUser = null;
    res.clearCookie(identityKey);
    res.send(ApiTools.getSucRtnData(''));
    
  });
});


app.get('/api/mine', function (req, res) {
  res.json(ApiTools.getSucRtnData({
    name: 'admin'
  }));
});


let server = app.listen(7000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log(" http://%s:%s", host, port)
})