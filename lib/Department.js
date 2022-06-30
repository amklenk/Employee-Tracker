//require
const db = require("../db/connection");
const cTable = require("console.table");

class Department {
  constructor(name = "") {
    this.id = id;
    this.name = name;
  }

  getDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
      console.table(rows);
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
      console.log(`The ${this.name} department was added to the database.`);
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
}

module.exports = Department;
