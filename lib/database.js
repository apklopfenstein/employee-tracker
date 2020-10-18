const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database
});

module.exports = connection;