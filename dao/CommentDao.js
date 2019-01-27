let dbutil = require("./DBUtil.js");


function insertComment(blogId, parent, parentName, userName, email, comment, ctime, utime, success){
  let insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`,`email`, `comments`,  `ctime`, `utime`) value (?, ?, ?, ?, ?, ?, ?, ?)"
  let params = [blogId, parent, parentName, userName, email, comment, ctime, utime];
  let connection = dbutil.createConnection();
  connection.query(insertSql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}

function queryCommentsByBlogId(blogId, success) {
  let querySql = "select * from comments where blog_id = ?";
  let params = [blogId];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}

function queryCommentsCountByBlogId(blogId, success) {
  let querySql = "select count(1) as count from comments where blog_id = ?";
  let params = [blogId];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}

function queryNewComments(size, success) {
  let querySql = "select * from comments order by id desc limit ?";
  let params = [size];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}

module.exports.queryNewComments = queryNewComments;
module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
