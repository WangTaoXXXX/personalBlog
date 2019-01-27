
let myBlogDao = require("../dao/myBlogDao.js");
let tagsDao = require("../dao/tagsDao.js");
let tagBlogMappingDao = require("../dao/TagBlogMapping.js");
let timeUtil = require("../util/TimeUtil.js");
let respUtil = require("../util/RespUtil.js");
let url = require("url");

let path = new Map();

// 编辑博客
function editBlog(request, response) {
  let params = url.parse(request.url, true).query;
  // 将tags中的空格去除，并将中文逗号替换为英文逗号
  let tags = params.tags.replace(/ /g, '').replace(/，/g,',');
  request.on("data", function (data) {
    myBlogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "添加博客成功", null ));
      response.end();

      let blogId = result.insertId; // 获取博客的插入ID
      let tagList = tags.split(',');
      for (let i = 0; i < tagList.length; i ++) {
        if (tagList[i] == '') {
          continue;
        }
        queryTag(tagList[i], blogId)
      }
    })
  })
}

// 查询博客
function queryBlogByPage (request, response) {
  let params = url.parse(request.url, true).query;
  myBlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
    // 将结果中的图片字符串过滤掉
    for (let i = 0; i < result.length; i ++ ) {
      result[i].content = result[i].content.replace(/<img[\w\W]*">/g, '');
      result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
      result[i].content = result[i].content.substring(0, 300);
    }

    response.writeHead(200);
    response.write(respUtil.writeResult("success", '查询成功', result));
    response.end();
  })
}

// 查询标签
function  queryTag(tag, blogId) {
  tagsDao.queryTag(tag, function (result) {
    if (result == null || result.length == 0) { // 如果没用当前标签的时候插入标签
      insertTag(tag, blogId)
    } else { // 如果有标签的时候，插入当前标签和博客的映射
      insertTagBlogMapping(result[0].id, blogId)
    }

  })
}


// 插入标签
function insertTag(tag, blogId) {
  tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) { // 在插入标签的时候，插入标签和文章的映射关系
    insertTagBlogMapping(result.insertId, blogId)
  })
}


// 插入标签和博客的索引
function insertTagBlogMapping(tagId, blogId) {
  tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
    console.log('插入标签和博客的映射关系成功')
  })
}


// 查询博客的总页数
function queryBlogCount(request, response) {
  myBlogDao.queryBlogCount(function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",result))
    response.end();
  })
}

// 通过博客ID进行博客查询
function queryBlogById(request, response) {
  let params = url.parse(request.url, true).query;
  myBlogDao.queryBlogById(parseInt(params.bid), function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
    // 在每次查询博客之后让让它的views + 1
    myBlogDao.addViews(parseInt(params.bid), function (result) {
    })
  })
}

// 查询所有的博客

function queryAllBlog(request, response) {
  myBlogDao.queryAllBlog(function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  })
}

// 根据浏览次数查询热门的博客

function queryHotBlog(request, response) {
  myBlogDao.queryHotBlog(5, function (result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  })
}

path.set('/queryHotBlog', queryHotBlog);
path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage);
path.set('/queryBlogCount', queryBlogCount);
path.set('/queryBlogById', queryBlogById);
path.set('/queryAllBlog', queryAllBlog);



module.exports.path = path;



