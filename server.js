//Create functions around these with class
//require
const db = require("./db/connection");
const cTable = require('console.table');

//db query
//**These are department queries */
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

//**These are roles queries */
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
// const sql2 = `UPDATE roles SET salary = ? WHERE id = ?`;
// const params = [110000, 1];

// db.query(sql2, params, (err, result) => {
//     if (err){
//         console.log("Sorry, that was not a correct update. Try again!");
//     } else if (!result.affectedRows) {
//         console.log("Role not found. Try again!");
//     } else {
//         console.log("The salary for the role you selected has been updated in the database.")
//     }
// });

//**These are employees queries */
//view all employees in joined table
const sql2 = 'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees e2 ON e2.id = e.manager_id';
db.query(sql2, (err, rows) => {
    console.log(rows)
});

//view employee by manager
// const sql3 = 'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE CONCAT(e2.first_name, " ", e2.last_name) = ?';
// db.query(sql3, "John Doe", (err, row)=> {
//     console.log(row);
// })

//update employee's Role

//add employee
// db.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id)
//               VALUES (?,?,?)`, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
//   console.log(`The ${params.title} role was added to the database.`);
// });

//delete employee
// db.query(`DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`, "Mike Chan", (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     // console.log(`The ${params.title} role was deleted from the database.`);
//   });
