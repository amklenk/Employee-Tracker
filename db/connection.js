//require
const mysql = require("mysql2");
//is there where I would require the password protector?

//middleware
const db = mysql.createConnection(
    {
      host: "localhost",
      //enter your own username, otherwise root
      user: "root",
      //enter your own password
      password: "",
      database: "business",
    }
  );

module.exports = db;