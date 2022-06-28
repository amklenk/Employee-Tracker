// Routes will start here and will be run through server.js
//Will we put inquirer here after we move the routes to routes folder?
//require
const express = require("express");
const db = require("./db/connection");

//PORT and EXPRESS
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//catchall
app.use((req, res) => {
    res.status(404).end();
  });
  
// listen/start server after DB connection
  db.connect(err => {
      if (err) throw err;
      console.log('Database connected.');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });