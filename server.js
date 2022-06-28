// Routes will start here and will be run through server.js
//Will we put inquirer here after we move the routes to routes folder?
//require
const express = require("express");
const db = require("./db/connection");
//not sure if this goes here or in index file where will run inquirer
// const cTable = require('console.table');

//PORT and EXPRESS
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//express and db query
//all info from department table
db.query (`SELECT * FROM department`, (err, rows) => {
console.log(rows);
});

//look at one department


app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

//catchall
app.use((req, res) => {
    res.status(404).end();
  });

// listen/start server after DB connection
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   });