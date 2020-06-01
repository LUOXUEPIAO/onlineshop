var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/TEST";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});