const mysql = require('mysql2');


 
 const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'RockyRanch88',
    database: 'traking'
  },
  console.log('Connection to tracker database.')
);

 module.exports = db;


 