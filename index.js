//require
const inquirer = require("inquirer");
const Department = require("./lib/Department");
const Roles = require("./lib/Roles");
const Employees = require("./lib/Employees");
const db = require("./db/connection");

//Inquirer Arrays
choicesArr = ["View all departments", "Add a department", "Delete a department", "View all roles", "Add a role", "Delete a role", "Update a role's salary", "View all employees", "View an employee by their manager", "View an employee by their role", "Update an employee's manager", "Add an employee", "Delete an Employee", "View the budget of each department", "Quit"
];

addRoleInq = function (departmentChoices) {
    return [{
    type: "text",
    name: "title",
    message: "What is the title of the new role?",
  },
  {
      type: "text",
      name: "salary",
      message: "What is the salary of the new role?",
  },
  {
      type: "list",
      name: "department",
      message: "What is the department of the new role?",
      choices: departmentChoices
  }];
};

updateRoleInq= function(roleChoices) {
    return[
    {
        type: "list",
        name: "title",
        message: "Which role would you like to update?",
        choices: roleChoices
  },
{
    type: "text",
    name: "salary",
    message: "What is the new salary of the role?",
}];
  };

//class and methods to run game
class Run {
 constructor () {
    this.roles = new Roles();
    this.department = new Department();
    this.employees= new Employees();
 }

 welcomeMessage(){
    console.log("Welcome to Employee-Tracker!");
    this.startProgram();
 }

 startProgram() {
    inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: choicesArr
    })
    .then(({ action }) => {
      switch (action){
        case "View all departments":
        this.department.getDepartments(this.startProgram);
        break;
        case "Add a department":
        this.addDepartment();
        break;
        case "Delete a department":
        this.deleteDepartment();
        break;
        case "View all roles":
        this.roles.getRoles(this.startProgram);
        break;
        case "Add a role":
        this.addRole();
        break;
        case "Delete a role":
        this.deleteRole();
        break;
        case "Update a role's salary":
        this.updateRole();
        break;
        case "View all employees":
        this.employees.getEmployees(this.startProgram);
        break;
        case "View an employee by their manager":
        this.viewManager();
        break;
        case "View an employee by their role":
        this.viewRole();
        case "Update an employee's manager":
        this.updateManager();
        break;
        case "Add an employee":
        this.addEmployee();
        break;
        case "Delete an Employee":
        this.deleteEmployee();
        break;
        case "View the budget of each department":
        this.department.departmentByBudget(this.startProgram);
        break;
        case "Quit":
            console.log("Goodbye!");
            process.exit();
        break;
      }

    });
 }

 //TODO: Not working, says undefined?
 addDepartment(){
    inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is the name of the new department?",
    })
    //destructure name from the prompt object
    .then(({ name }) => {
      this.department.addDepartment(name);
      console.log(`The ${name} department was added to the database.`);
      //go back to the initial prompt
      this.startProgram();
    });
 }

 deleteDepartment(){
    db.query(`SELECT name FROM department`, (err, rows) => {
        const deptChoices = rows.map(row => { 
            return { value: row.name, name: row.name }
        });
    inquirer
    .prompt({
      type: "list",
      name: "name",
      message: "Which department would you like to delete?",
      choices: deptChoices
    })
    //destructure name from the prompt object
    .then(({ name }) => {
      this.department.deleteDepartment(name);
      console.log(`The ${name} department was deleted from the database.`);
      //go back to the initial prompt
      this.startProgram();
 });
});
 }

addRole(){
    db.query(`SELECT id, name FROM department`, (err, rows) => {
        const deptChoices = rows.map(row => { 
            return { value: row.id, name: row.name }
        });
        const choices = addRoleInq(deptChoices);

        inquirer
        .prompt(choices)
        //destructure name from the prompt object
        .then(({ title, salary, department }) => {
          this.roles.addRole(title, salary, department);
          console.log(`The ${title} role was added to the database.`);
          //go back to the initial prompt
          this.startProgram();
        });
    })
}

deleteRole(){
    db.query(`SELECT title FROM roles`, (err, rows) => {
        const roleChoices = rows.map(row => { 
            return { value: row.title, name: row.title }
        });
    inquirer
    .prompt({
      type: "list",
      name: "title",
      message: "Which role would you like to delete?",
      choices: roleChoices
    })
    .then(({ title }) => {
      this.roles.deleteRole(title);
      console.log(`The ${title} role was deleted from the database.`);
      this.startProgram();
 });
});
}

updateRole(){
    db.query(`SELECT title FROM roles`, (err, rows) => {
        const roleChoices = rows.map(row => {
            return { value: row.title, name: row.title }
        });
        const choices = updateRoleInq(roleChoices);
        inquirer
        .prompt(choices)
        //destructure name from the prompt object
        .then(({ title, salary }) => {
          this.roles.updateRole(title, salary);
          console.log(`The salary for the ${title} role has been updated in the database.`);
          //go back to the initial prompt
          this.startProgram();
        });
    });
}

viewManager(){
    const sql = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS manager 
    FROM employees as e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE e.manager_id IS NOT NULL`;
    db.query(sql, (err, rows) => {
        const managerChoices = rows.map(row => {
            return { value: row.manager, name: row.manager }
        });
    inquirer.prompt({
        type: "list",
        name: "manager",
        message: "Select a manager to see their employees.",
        choices: managerChoices
    })
    .then(({ manager }) => {
        this.employees.viewEmployeeManager(manager, this.startProgram);
        //go back to the initial prompt
        ;
      });
});
}

//TODO: says undefined
viewRole(){
    const sql = `SELECT e.role_id, roles.title AS title
    FROM employees as e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        const rolesChoices = rows.map(row => {
            return { value: row.role_id, name: row.title }
        });
        inquirer.prompt({
            type: "list",
            name: "role",
            message: "Select the role to see the employees.",
            choices: rolesChoices
        })
        .then(({ role }) => {
            this.employees.viewEmployeeRole(role, this.startProgram);
        });
    });
    
}

//TODO: FINISH THESE and fix functions
updateManager(){

};

addEmployee(){

};

deleteEmployee(){

};

};


new Run().welcomeMessage();