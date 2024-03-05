const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3307 || 3306,
    database: 'trung142',
    password: '123456'
})

module.exports = pool;