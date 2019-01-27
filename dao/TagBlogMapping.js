let dbutil = require('./DBUtil.js');

function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
  let insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) value (?, ?, ?, ?)";
  let params = [tag_id, blog_id, ctime, utime];
  let connection = dbutil.createConnection();
  connection.query(insertSql, params, function (error, result) {
    if (error == null) {
      // success(result)
    } else {
      throw new Error(error);
    }
  });
  connection.end();
}

function queryByTag(tag_id, page, pageSize, success) {
  let querySql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?";
  let params = [tag_id, page * pageSize, pageSize];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error);
    }
  });
  connection.end();
}

function queryByTagCount(tag_id, success) {
  let querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
  let params = [tag_id];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error);
    }
  });
  connection.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;
