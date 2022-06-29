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
//   console.log("The ${params.name} department was added to the database.")
// });

//delete a department
// db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     console.log("The ${params.name} department was deleted from the database.");
//   });

//all info from roles table
const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department
FROM roles
LEFT JOIN department ON roles.department_id = department.id`;
db.query(sql, (err, rows) => {
    console.log(rows)
});

//add a role
// const params = ['Paralegal', 60000, 4];

// db.query(`INSERT INTO roles (title, salary, department_id)
//               VALUES (?,?,?)`, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
//   console.log(`The ${params.title} role was added to the database.`);
// });

//delete a role
// db.query(`DELETE FROM roles WHERE id = ?`, 9, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     // console.log(`The ${params.title} role was deleted from the database.`);
//   });

//update a role's salary
const sql2 = `UPDATE roles SET salary = ? WHERE id = ?`;
const params = [110000, 1];

db.query(sql2, params, (err, result) => {
    if (err){
        console.log("Sorry, that was not a correct update. Try again!");
    } else if (!result.affectedRows) {
        console.log("Role not found. Try again!");
    } else {
        console.log("The salary for the role you selected has been updated in the database.")
    }
});

