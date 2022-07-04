const db = require('../db/connection');
const cTable = require('console.table');

  getEmployees = function () {
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees e2 ON e2.id = e.manager_id';
    db.query(sql, (err, rows) => {
      console.table(rows);
      startProgram();
    });
  };

  viewEmployeeManager = function (manager) {
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE CONCAT(e2.first_name, " ", e2.last_name) = ?';
    db.query(sql, manager, (err, row) => {
      console.table(row);
      startProgram();
    });
  };

  viewEmployeeRole = function (role) {
    roleNumber = parseInt(role);
    const sql =
      'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE e.role_id = ?';
    db.query(sql, roleNumber, (err, row) => {
      console.table(row);
      startProgram();
    });
  };

  updateEmployeeManager = function (employee, manager_id){
  const splitEmployee = employee.split(" ");
  first_name = splitEmployee[0];
  last_name = splitEmployee[1];

  const sql = `UPDATE employees SET manager_id = ? WHERE first_name = ?
  AND last_name = ?;`;
  const params = [manager_id, first_name, last_name];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
  startProgram();
  };

  updateEmployeeRole = function (employee, role_id){
  const splitEmployee = employee.split(" ");
  first_name = splitEmployee[0];
  last_name = splitEmployee[1];

  const sql = `UPDATE employees SET role_id = ? WHERE first_name = ?
  AND last_name = ?;`;
  const params = [role_id, first_name, last_name];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
  startProgram();

  }

  addEmployee = function (first_name, last_name, role_id, manager_id) {
    const params = [first_name, last_name, role_id, manager_id];

    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
      params,
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    startProgram();
  };

  deleteEmployee = function (name) {
    db.query(
      `DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`,
      name,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`{$name} has been deleted from the database.`);
      }
      );
    startProgram();
  };

module.exports = { getEmployees, viewEmployeeManager, viewEmployeeRole, updateEmployeeManager, updateEmployeeRole, addEmployee, deleteEmployee };


