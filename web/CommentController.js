let url = require('url');
let commentDao = require("../dao/CommentDao.js");
let timeUtil = require("../util/TimeUtil.js");
let respUtil = require("../util/RespUtil.js");

// 引入生成验证码的工具
let captcha = require('svg-captcha');


let path = new Map();
function addComment(request, response) {
  let params = url.parse(request.url, true).query;

  commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content,
      timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null))
        response.end();
      })
}

// 生成随机验证码
function queryRandomCode(request, response) {
  let img = captcha.create({fontSize: 50, width: 100, height: 34});
  response.writeHead(200);
  response.write(respUtil.writeResult("success", "评论成功", img));
  response.end();
}

// 根据博客id查询所有评论
function queryCommentsByBlogId(request, response) {
  let params = url.parse(request.url, true).query;
  commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取评论成功", result));
    response.end();
  })
}

// 通过博客Id 查询浏览总数
function queryCommentsCountByBlogId(request, response) {
  let params = url.parse(request.url, true).query;
  commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取评论总数成功", result));
    response.end();
  })
}


function queryNewComments(request, response) {
  commentDao.queryNewComments(5, function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", '查询最新评论成功', result));
    response.end();
  })
}

path.set('/queryNewComments', queryNewComments);

path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

path.set("/queryRandomCode", queryRandomCode);

path.set('/addComment', addComment);

module.exports.path = path;
