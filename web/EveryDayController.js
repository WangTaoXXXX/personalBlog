
let EveryDayController = require("../dao/EveryDayDao.js");
let timeUtil = require("../util/TimeUtil.js");
let respUtil = require("../util/RespUtil.js");

let path = new Map();

function editEveryDay(request, response) {
  request.on("data", function (data) {
    EveryDayController.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "添加成功", null ));
      response.end();
    })
  })
}

function queryEveryDay (request, response) {
  EveryDayController.queryEveryDay(function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "请求成功", result));
    response.end();
  })
}

path.set('/queryEveryDay', queryEveryDay);

path.set("/editEveryDay", editEveryDay);

module.exports.path = path;

