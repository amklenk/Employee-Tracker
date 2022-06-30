//require
const db = require("../db/connection");
const cTable = require("console.table");

class Department {
  constructor(name = "", id) {
    this.id = id;
    this.name = name;
  }

  getDepartments(callback) {
    db.query(`SELECT * FROM department`, (err, rows) => {
      console.table(rows);
      callback();
    });
  }

  addDepartment(name) {
    const sql = `INSERT INTO department (name)
                  VALUES (?)`;
    this.name = name;

    db.query(sql, this.name, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }

  deleteDepartment(name) {
    this.name = name;
    db.query(`DELETE FROM department WHERE name = ?`, this.name, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`The ${this.name} department was deleted from the database.`);
    });
  }

  departmentByBudget(callback){
    const sql = `SELECT department.name AS department, SUM(roles.salary) AS budget
    FROM employees e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees e2 ON e2.id = e.manager_id
    GROUP BY department`;

    db.query(sql, (err, rows) => {
      console.table(rows);
      callback();
    });
  }
}

module.exports = Department;
