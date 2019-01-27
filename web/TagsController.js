
let tagsDao = require("../dao/tagsDao.js");
let tagMappingDao = require('../dao/TagBlogMapping');
let respUtil = require("../util/RespUtil.js");
let blogDao = require("../dao/myBlogDao");
let url = require('url');

let path = new Map();

function queryRandomTags(request, response) {
  tagsDao.queryAllTag(function (result) {
    result.sort(function () {
      return Math.random() > 0.5 ? true : false;
    });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取随机标签成功", result ));
    response.end();
  })
}


function queryByTag(request, response) {
  let params = url.parse(request.url, true).query;
  tagsDao.queryTag(params.tag, function (result) {
    if (result == null || result.length == 0) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "获取随机标签成功", result ));
      response.end();
    } else {
      tagMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
        let blogList = [];
        for (let i = 0; i < result.length; i ++) {
          blogDao.queryBlogById(result[i].blog_id, function (result) {
            blogList.push(result[0])
          })
        }
        getResult(blogList, result.length, response);
      })
    }

  })

}

function queryByTagCount(request, response) {
  let params = url.parse(request.url, true).query;
  tagsDao.queryTag(params.tag, function (result) {
    tagMappingDao.queryByTagCount(result[0].id, function (result) {
      response.writeHead(200);
      response.write(respUtil.writeResult('success', "查询当前tag的博客数成功", result))
      response.end();
    })
  })
}

function getResult(blogList, len, response){
  if (blogList.length < len) {
    setTimeout(function () {
      getResult(blogList, len, response)
    }, 10)
  } else {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "获取随机标签成功", blogList ));
    response.end();
  }
}

path.set('queryByTagCount', queryByTagCount);

path.set('/queryByTag', queryByTag);

path.set('/queryRandomTags', queryRandomTags);

path.set('/queryByTagCount', queryByTagCount);

module.exports.path = path;
