const db = require('../db/connection');
const cTable = require('console.table');

getRoles = function () {
  const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department
      FROM roles
      LEFT JOIN department ON roles.department_id = department.id`;
  db.query(sql, (err, rows) => {
    console.table(rows);
    startProgram();
  });
};

addRole = function (title, salary, department_id) {
  numberSalary = parseInt(salary);

  const params = [title, numberSalary, department_id];

  db.query(
    `INSERT INTO roles (title, salary, department_id)
            VALUES (?,?,?)`,
    params,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  startProgram();
};

deleteRole = function (title) {
  db.query(`DELETE FROM roles WHERE title = ?`, title, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  startProgram();
};

updateRole = function (title, salary) {
  salaryNumber = parseInt(salary);
  const params = [salaryNumber, title];

  db.query(
    `UPDATE roles SET salary = ? WHERE title = ?`,
    params,
    (err, result) => {
      if (err) {
        console.log("Sorry, that was not a correct update. Try again!");
      } else if (!result.affectedRows) {
        console.log("Role not found. Try again!");
      }
});
startProgram();
};

module.exports = { getRoles, addRole, deleteRole, updateRole};
