const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'RockyRanch88',
    database: 'tracker'
  },
  console.log('Connection to tracker database.')
);

module.exports = db;