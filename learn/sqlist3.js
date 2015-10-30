var fs = require("fs");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('xxtebook.db');

db.serialize(function() {
  // // 建表
  // db.run("CREATE TABLE IF NOT EXISTS todo (title TEXT)");

  // // 插入数据
  // var stmt = db.prepare("INSERT INTO todo(title) VALUES (?)");
  // stmt.run('起床');
  // stmt.run('洗刷');
  // stmt.finalize();
 var Setting = {}
  db.all("SELECT * FROM Setting", function(err, rows) {
    rows.forEach(function (row) {
       Setting[row._id] = row.value
    });
  });

  // 或者
  // db.each("SELECT rowid AS id, title FROM todo", function(err, row) {
  //    console.log(row.id + ": " + row.title);
  // });
});


// function readAllRows() {
// 	var Setting = {}
//     db.all("SELECT * FROM Setting", function(err, rows) {
//         rows.forEach(function (row) {
//             Setting[row._id] = row.value
//         });
//     });
// }
// function closeDb() {
//     console.log("closeDb");
//     db.close();
// }
// readAllRows();