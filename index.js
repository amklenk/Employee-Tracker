//require
const inquirer = require("inquirer");
const Department = require("./lib/Department");
const Roles = require("./lib/Roles");
const Employees = require("./lib/Employees");

//choices Array for running the program
choicesArr = ["View all departments", "Add a department", "Delete a department", "View all roles", "Add a role", "Delete a role", "Update a role's salary", "View all employees", "View an employee by their manager", "Update an employee's manager", "Add an employee", "Delete an Employee", "View the budget of each department", "Quit"
];

addRoleInq = [{
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
      type: "text",
      name: "department",
      message: "What is the department of the new role?",
  }];

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
    //destructure name from the prompt object
    .then(({ action }) => {
      switch (action){
        case "View all departments":
        this.department.getDepartments();
        this.startProgram();
        break;
        case "Add a department":
        this.addDepartment();
        break;
        case "Delete a department":
        this.deleteDepartment();
        break;
        case "View all roles":
        this.roles.getRoles();
        this.startProgram();
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
        this.employees.getEmployees();
        this.startProgram();
        break;
        case "View an employee by their manager":
        this.viewManager();
        break;
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
        this.viewBudget();
        break;
        case "Quit":
        this.endProgram();
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
    inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "Which department would you like to delete?",
    })
    //destructure name from the prompt object
    .then(({ name }) => {
      this.department.deleteDepartment(name);
      console.log(`The ${name} department was deleted from the database.`);
      //go back to the initial prompt
      this.startProgram();
 });
}

addRole(){
    inquirer
    .prompt(addRoleInq)
    //destructure name from the prompt object
    .then(({ title, salary, department }) => {
      this.roles.addRole(title, salary, department);
      console.log(`The ${title} role was added to the database.`);
    //   //go back to the initial prompt
      this.startProgram();
    });
}

deleteRole(){

}

updateRole(){}

};

new Run().welcomeMessage();