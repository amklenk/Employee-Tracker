//require
const mysql = require("mysql2");

//middleware
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      //password hashed out
      password: "############",
      database: "",
    },
    console.log("Connected to the _ database.")
  );

module.exports = db;