let fs = require("fs");

let globalConfig = {};

let conf = fs.readFileSync("./server.conf");
let configArr = conf.toString().split('\r\n');

for(let i = 0; i < configArr.length; i ++) {
  if (configArr[i].split('=')[0] === '') {
    continue
  }
  globalConfig[configArr[i].split('=')[0].trim()] = configArr[i].split("=")[1].trim();
}

module.exports = globalConfig;
