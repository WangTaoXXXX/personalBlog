let fs = require("fs");
let globalConfig = require("./config.js");


let controllerSet = [];

let pathMap = new Map();

let files = fs.readdirSync(globalConfig["web_path"]);

for (let i = 0; i < files.length; i ++) {
  let temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
  if (temp.path) {
    for (let [key, value] of temp.path) {
      if (pathMap.get(key) == null) {
        pathMap.set(key, value)
      } else {
        throw new Error("url 异常，url:" + key)
      }
    }
    controllerSet.push(temp);
  }
}


module.exports = pathMap;
