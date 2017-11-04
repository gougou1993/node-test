var mssql = require('mssql');

var config = {
  user: 'wise',
  password: 'wisewrong',
  server: 'wisewrong.com',
  database: 'wise'
};

var sql = {};
function wiseSql(sqltext, res) {
  return new Promise(function (resolve, reject) {
    mssql.connect(config).then(function () {
      // Query
      new mssql.Request()
        .query(sqltext).then(function (result) {
          resolve(result)
          mssql.close();
        }).catch(function (err) {
          reject(err)
          res.render('error');
          console.log('出错了 ', err);
          mssql.close();
        })
    })
  })
}

sql.list = function (res, sqltext, code, template, data) {
  wiseSql(sqltext, res).then(result => {
    data[code] = result.recordset;
    res.render(template, data);
  })
}

sql.detail = function (res, sqltext, code, template, data) {
  wiseSql(sqltext, res).then(result => {
    data[code] = result.recordset[0];
    res.render(template, data);
  })
}

sql.add = function (res, sqltext) {
  wiseSql(sqltext, res).then(result => {
    console.log('评论成功');
    res.status(200).end();
  })
}

module.exports = sql;
