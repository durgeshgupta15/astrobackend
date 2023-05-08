const mysql = require('mysql');
const dotenv = require('dotenv').config()

const connection = mysql.createPool({
    connectionLimit: 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    debug: false,
    multipleStatements: true
})
module.exports = connection;