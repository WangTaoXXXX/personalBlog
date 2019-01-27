let express = require("express");
let globalConfig = require("./config");
let loader = require("./loader.js");


let app = new express();

app.use(express.static("./page/"));

// 每日一句的相关路由配置
app.post("/editEveryDay", loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));

// 博客页面的相关路由配置
app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/queryBlogById', loader.get('/queryBlogById'));
app.get('/queryAllBlog', loader.get('/queryAllBlog'));
app.get('/queryHotBlog', loader.get('/queryHotBlog'));
app.get('/queryByTag', loader.get('/queryByTag'));
app.get('/queryByTagCount', loader.get('/queryByTagCount'));

// 评论部分的相关路由配置
app.get('/addComment', loader.get('/addComment'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
app.get('/queryCommentsCountByBlogId', loader.get('/queryCommentsCountByBlogId'));
app.get('/queryNewComments', loader.get('/queryNewComments'));

// 请求随机验证码的相关路由配置
app.get('/queryRandomCode', loader.get('/queryRandomCode'));

// 查询标签的路由配置
app.get('/queryRandomTags', loader.get('/queryRandomTags'));

app.listen(globalConfig.port, function () {
    console.log("服务器已启动")
});
