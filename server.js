// Routes will start here and will be run through server.js
//Will we put inquirer here after we move the routes to routes folder?
//require
const db = require("./db/connection");
const cTable = require('console.table');

//db query
//all info from department table
db.query (`SELECT * FROM department`, (err, rows) => {
console.log(rows);
});

//add a department
// const sql = `INSERT INTO department (id, name)
//               VALUES (?,?)`;
// const params = [1, 'Sales'];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

//delete a department
// db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
