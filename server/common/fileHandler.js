 //文件路径，__dirname为当前运行js文件的目录
 //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
 let path = require('path'); //系统路径模块
 let fs = require('fs'); //文件模块
 //读取json文件
function getJson(fileName) {
    let file = path.join(__dirname, '../data/'+fileName);
     return new Promise((resolve,reject)=>{
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
               reject("");
            } else {
               resolve(data);
            }
        })
     })
     
 };

 module.exports = {
    getJson
}