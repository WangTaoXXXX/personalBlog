let mySql = require('mysql');

function createConnection () {
  let connection = mySql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'zmg19970401',
    database: 'my_blog'
  })

  return connection;
}


module.exports.createConnection = createConnection;
