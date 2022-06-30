const db = require("../db/connection");
const cTable = require("console.table");

class Employees {
    constructor (first_name = "", last_name = "", role_id, manager_id){
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    getEmployees(callback){
const sql = 'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees e2 ON e2.id = e.manager_id';
db.query(sql, (err, rows) => {
    console.table(rows)
    callback();
});
    }

    viewEmployee(manager){
    const sql = 'SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department FROM employees as e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS e2 ON e2.id = e.manager_id WHERE CONCAT(e2.first_name, " ", e2.last_name) = ?';
    db.query(sql, manager, (err, row)=> {
        console.log(row);
    })
    }

    //update employee's Role

    //update employee's manager

    //TODO: fix this with db query in index.js
 addEmployee(first_name, last_name, role, manager){
    this.first_name = first_name;
    this.last_name = last_name;
    if (role === "Sales Lead"){
        this.role_id === 1;
    } else if (role === "Salesperson"){
        this.role_id === 2;
    } else if (role === "Lead Engineer"){
        this.role_id === 3;
    } else if (role === "Software Engineer"){
        this.role_id === 4;
    } else if (role === "Account Manager"){
        this.role_id === 5;
    } else if (role === "Accountant"){
        this.role_id === 6;
    } else if (role === "Legal Team Lead"){
        this.role_id === 7;
    } else if (role === "Lawyer"){
        this.role_id === 8;
    } else {
        this.role_id === 9;
    }

    if (manager === "John Doe"){
        this.manager_id === 1;
    } else if (manager === "Ashley Rodriguez"){
        this.manager_id === 3;
    } else if (manager === "Kunal Singh"){
        this.manager_id === 5;
    } else if (manager === "Sarah Lourd"){
        this.manager_id === 7;
    } else if (manager === "None") {
        this.manager_id === NULL;
    }

     db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                   VALUES (?,?,?)`, params, (err, result) => {
       if (err) {
         console.log(err);
       }
       console.log(`${this.first_name} ${this.last_name} was added to the database.`);
     });
 }

 deleteEmployee(name){
     db.query(`DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`, name, (err, result) => {
         if (err) {
           console.log(err);
         }
         console.log(`${name} was deleted from the database.`);
       });
 }
  
};

module.exports = Employees; 
