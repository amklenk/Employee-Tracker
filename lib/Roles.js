const db = require("../db/connection");
const cTable = require("console.table");

class Roles {
  constructor(title = "", salary, department_id) {
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }

  getRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department
        FROM roles
        LEFT JOIN department ON roles.department_id = department.id`;
    db.query(sql, (err, rows) => {
      console.table(rows);
    });
  }

  addRole(title, salary, department) {
    this.title = title;
    this.salary = parseInt(salary);
    
    //TODO:this isn't working
    if (department == "Sales") {
      this.department_id === 1;
    } else if (department == "Engineering") {
      this.department_id === 2;
    } else if (department == "Finance") {
      this.department_id === 3;
    } else if (department == "Legal") {
      this.department_id === 4;
    } else {
      this.department_id === 5;
    }

    const params = [this.title, this.salary, this.department_id];

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
  }

  deleteRole(title) {
    this.title = title;
    db.query(`DELETE FROM roles WHERE title = ?`, title, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }

  updateRole(title, salary) {
    this.title = JSON.stringify(title);
    this.salary = parseInt(salary);
    const params = [this.salary, this.title];

    db.query(
      `UPDATE roles SET salary = ? WHERE title = ?`,
      params,
      (err, result) => {
        if (err) {
          console.log("Sorry, that was not a correct update. Try again!");
        } else if (!result.affectedRows) {
          console.log("Role not found. Try again!");
        } else {
          console.log(
            "The salary for the role you selected has been updated in the database."
          );
        }
      }
    );
  }
}

module.exports = Roles;
