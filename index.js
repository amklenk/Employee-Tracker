//require
const inquirer = require("inquirer");
const asciiart = require ("asciiart-logo");
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

addEmployeeInq = function (rolesChoices, managerChoices){
return [{
    type: "text",
    name: "first",
    message: "What is the employee's first name?"
},
{
    type: "text", 
    name: "last",
    message: "What is the employee's last name?"
}, 
{ type: "list",
  name: "role",
  message: "Which role will this employee have?",
  choices: rolesChoices
},{
    type: "list",
    name: "manager",
    message: "Which manager will be the employee's manager?",
    choices: managerChoices
}]
};

updateEmployeeInq = function (employeeChoices, managerChoices){
return [{
    type: "list",
    name: "employee",
    message: "Which employee would you like to update?",
    choices: employeeChoices
},
{
    type: "list",
    name: "manager",
    message: "Which manager is the employee's new manager?",
    choices: managerChoices
}]
};

//class and methods to run game
class Run {
 constructor () {
    // this.roles = new Roles();
    // this.department = new Department();
    // this.employees= new Employees();
 }

 welcomeMessage(){
    //TODO: Put Logo here
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
        Department.getDepartments(this.startProgram);
        break;
        case "Add a department":
        console.log(this);
        this.addDepartment();
        break;
        case "Delete a department":
        console.log(this);
        this.deleteDepartment();
        break;
        case "View all roles":
        Roles.getRoles(this.startProgram);
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
        Employees.getEmployees(this.startProgram);
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
        Department.departmentByBudget(this.startProgram);
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
      Department.addDepartment(name);
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
      Department.deleteDepartment(name);
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
          Roles.addRole(title, salary, department);
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
      Roles.deleteRole(title);
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
          Roles.updateRole(title, salary);
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
        Employees.viewEmployeeManager(manager, this.startProgram);
        //go back to the initial prompt
        ;
      });
});
}

viewRole(){
    const sql = `SELECT e.role_id, roles.title AS title
    FROM employees as e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE roles.title IS NOT NULL`;
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
            Employees.viewEmployeeRole(role, this.startProgram);
        });
    });
    
}

//TODO: does not work
updateManager(){
    db.query(`SELECT CONCAT (first_name, " ", last_name) AS employee_name FROM employees`, (err, rows) => {
        const employeeChoices = rows.map(row => {
            return { value: row.employee_name, name: row.employee_name }
        });

    const sql = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
    FROM employees as e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE e.manager_id IS NULL`;
    db.query(sql, (err, rows) => {
        const managerChoices = rows.map(row => {
            return { value: row.id, name: row.manager }
        });
    const choices = updateEmployeeInq(employeeChoices, managerChoices);
    inquirer.prompt(choices)
    .then( ({ employee, manager }) => {
        Employees.updateEmployee(employee, manager);
        console.log(`${employee}'s manager was updated in the database.`);
        //go back to the initial prompt
        this.startProgram();
    });
    });
});
}

addEmployee(){
    db.query(`SELECT e.role_id, roles.title AS title
    FROM employees as e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE roles.title IS NOT NULL`, (err, rows) => {
        const rolesChoices = rows.map(row => {
            return { value: row.role_id, name: row.title }
        });
    const sql = `SELECT e.manager_id, CONCAT(e2.first_name, " ", e2.last_name) AS manager 
        FROM employees as e
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id 
        LEFT JOIN employees AS e2 ON e2.id = e.manager_id
        WHERE e.manager_id IS NOT NULL`;
        db.query(sql, (err, rows) => {
            const managerChoices = rows.map(row => {
                return { value: row.manager_id, name: row.manager }
            });
        const roleManager = addEmployeeInq(rolesChoices, managerChoices);
            inquirer.prompt(roleManager)
            .then(({ first, last, role, manager }) => {
                console.log(role);
                console.log(manager);
                Employees.addEmployee( first, last, role, manager);
                console.log(
                    `${first} ${last} was added to the database.`
                  );
                this.startProgram();
            })
        });
});
}

deleteEmployee(){
    db.query(`SELECT CONCAT (first_name, " ", last_name) AS employee_name FROM employees`, (err, rows) => {
        const employeeChoices = rows.map(row => {
            return { value: row.employee_name, name: row.employee_name }
        });
    
        inquirer.prompt({
            type: "list", 
            name: "employee",
            message: "Which employee would you like to delete?",
            choices: employeeChoices
        })
        .then( ({ employee }) => {
            Employees.deleteEmployee(employee);
            console.log(`${employee} has been deleted from the database.`);
            //go back to the initial prompt
            this.startProgram();
          })
    });
    }

};


new Run().welcomeMessage();