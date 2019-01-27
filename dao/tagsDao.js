let dbutil = require("./DBUtil.js");

function insertTag(tag, ctime, utime, success) {
  let insertSql = "insert into tags (`tag`, `ctime`, `utime`) value (?, ?, ?)"
  let params = [tag, ctime, utime];

  let connection = dbutil.createConnection();

  connection.query(insertSql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end()
}


function queryTag (tag, success) {
  let querySql = "select * from tags where tag = ?";
  let params = [tag];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null){
      success(result);
    } else {
      throw new Error(error);
    }
  })
}

function queryByTagCount() {

}

function queryAllTag (success) {
  let querySql = "select * from tags ";
  let params = [];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null){
      success(result);
    } else {
      throw new Error(error);
    }
  })
}

module.exports.queryByTagCount = queryByTagCount;
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
