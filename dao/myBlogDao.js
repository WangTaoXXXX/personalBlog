let dbutil = require("./DBUtil.js");

function insertBlog(title, content, tags, views, ctime, utime, success) {
  let insertSql = "insert into blog(`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
  let params = [title, content, tags, views, ctime, utime];

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


function queryBlogByPage(page, pageSize, success) {
  let querySql = "select * from blog order by id desc limit ?, ?";
  let params = [page * pageSize, pageSize];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function(error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}

function queryBlogCount(success) {
  let querySql = "select count(1) as count from blog";
  let connection = dbutil.createConnection();
  connection.query(querySql, function(error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end();
}


function queryBlogById (id, success) {
  let querySql = "select * from blog where id = ?";
  let params = [id];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end()
}

// 倒叙取博客
function queryAllBlog (success) {
  let querySql = "select * from blog order by id desc";
  let params = [];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end()
}

// 增加博客的浏览次数
function addViews(id, success) {
  let querySql = "update blog set views = views + 1 where id = ?";
  let params = [id];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end()
}

// 根据浏览次数查询出最热门的博客
function queryHotBlog(size, success) {
  let querySql = "select * from blog order by views desc limit ?";
  let params  = [size];
  let connection = dbutil.createConnection();
  connection.query(querySql, params, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      throw new Error(error)
    }
  });
  connection.end()
}



module.exports.queryHotBlog = queryHotBlog;
module.exports.addViews = addViews;
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
