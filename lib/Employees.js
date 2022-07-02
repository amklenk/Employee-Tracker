const db = require("../db/connection");
const cTable = require("console.table");

class Employees {
  constructor(first_name = "", last_name = "", role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  getEmployees(callback) {
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees e2 ON e2.id = e.manager_id';
    db.query(sql, (err, rows) => {
      console.table(rows);
      callback();
    });
  }

  viewEmployeeManager(manager, callback) {
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE CONCAT(e2.first_name, " ", e2.last_name) = ?';
    db.query(sql, manager, (err, row) => {
      console.table(row);
      callback();
    });
  }

  //update employee's Role
  viewEmployeeRole(role, callback) {
    this.role_id = parseInt(role);
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE e.role_id = ?';
    db.query(sql, this.role_id, (err, row) => {
      console.table(row);
      callback();
    });
  }

  //update employee's manager
  updateEmployee(employee, manager_id){
  const splitEmployee = employee.split("");
  this.first_name = splitEmployee[0];
  this.manager_id = manager_id;

  const sql = `UPDATE employees SET manager_id = ? WHERE first_name = ?;`;
  params = [this.manager_id, this.first_name]
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  })

  }

  addEmployee(first_name, last_name, role_id, manager_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;

    const params = [this.first_name, this.last_name, this.role_id, this.manager_id];

    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
      params,
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  deleteEmployee(name) {
    db.query(
      `DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`,
      name,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`${name} was deleted from the database.`);
      }
    );
  }
}

module.exports = new Employees;


