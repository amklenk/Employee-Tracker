//require
const db = require("../db/connection");
const cTable = require("console.table");

getDepartments = function () {
  db.query(`SELECT * FROM department`, (err, rows) => {
    console.table(rows);
    startProgram();
  });
};

addDepartment= function (name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, name, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`The ${name} department was added to the database.`)
    });
    startProgram();
  };

  deleteDepartment = function (name) {
    db.query(`DELETE FROM department WHERE name = ?`, name, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    startProgram();
  };

  departmentByBudget = function (){
    const sql = `SELECT department.name AS department, SUM(roles.salary) AS budget
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees e2 ON e2.id = e.manager_id
    WHERE department.name IS NOT NULL
    GROUP BY department`;

    db.query(sql, (err, rows) => {
      console.table(rows);
      startProgram();
    });
  };

module.exports = { getDepartments, addDepartment, deleteDepartment, departmentByBudget };
