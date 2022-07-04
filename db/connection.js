//require
const mysql = require("mysql2");
require('dotenv').config();

//middleware
const db = mysql.createConnection(
    {
      host: "localhost",
      //enter your own username, otherwise root
      user: "root",
      //enter your own password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }
  );

module.exports = db;