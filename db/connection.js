//require
const mysql = require("mysql2");

//middleware
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      //password hashed out
      password: "############",
      database: "business",
    },
    console.log("Connected to the business database.")
  );

module.exports = db;