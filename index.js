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
  }]
};

//TODO: db call to have updated
  updateRoleInq= [
    {
        type: "list",
        name: "title",
        message: "What is the title of the role?",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
  },
{
    type: "text",
    name: "salary",
    message: "What is the new salary of the role?",
}]

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

 startProgram () {
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

//TODO: test me
deleteRole(){
    db.query(`SELECT title FROM roles`, (err, rows) => {
        const deptChoices = rows.map(row => { 
            return { value: row.title, name: row.title }
        });
    inquirer
    .prompt({
      type: "list",
      name: "title",
      message: "Which role would you like to delete?",
      choices: deptChoices
    })
    .then(({ title }) => {
      this.roles.deleteRole(title);
      console.log(`The ${title} role was deleted from the database.`);
      this.startProgram();
 });
});
}

//TODO: this needs db
updateRole(){
    inquirer
    .prompt(updateRoleInq)
    //destructure name from the prompt object
    .then(({ title, salary }) => {
      this.roles.updateRole(title, salary);
      console.log(`The salary for the ${title} role has been updated in the database.`);
      //go back to the initial prompt
      this.startProgram();
    })
}

//TODO: FINISH THESE and fix functions
viewManager(){

};

viewRole(){

};

updateManager(){

};

addEmployee(){

};

deleteEmployee(){

};

};


new Run().welcomeMessage();