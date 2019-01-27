let mySql = require('mysql');

function createConnection () {
  let connection = mySql.createConnection({
    host: '47.105.184.128',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  });

  return connection;
}


module.exports.createConnection = createConnection;
