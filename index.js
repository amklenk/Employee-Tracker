//require
const inquirer = require("inquirer");
const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());
const { getDepartments, addDepartment, deleteDepartment, departmentByBudget } = require("./lib/Department");
const { getRoles, addRole, deleteRole, updateRole } = require("./lib/Roles");
const { getEmployees, viewEmployeeManager, viewEmployeeRole, updateEmployee, addEmployee, deleteEmployee } = require("./lib/Employees");
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


 welcomeMessage = function(){
    //TODO: Put Logo here
    console.log(
        logo({
            name: 'Employee Tracker',
            font: 'Broadway KB',
            lineChars: 10,
            padding: 2,
            margin: 2,
            borderColor: 'grey',
            logoColor: 'bold-blue',
            textColor: 'blue',
        })
        .render()
    );
    startProgram();
 };

 startProgram = function () {
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
        getDepartments();
        break;
        case "Add a department":
        addDepartmentMethod();
        break;
        case "Delete a department":
        deleteDepartmentMethod();
        break;
        case "View all roles":
        getRoles();
        break;
        case "Add a role":
        addRoleMethod();
        break;
        case "Delete a role":
        deleteRoleMethod();
        break;
        case "Update a role's salary":
        updateRoleMethod();
        break;
        case "View all employees":
        getEmployees();
        break;
        case "View an employee by their manager":
        viewManagerMethod();
        break;
        case "View an employee by their role":
        viewRoleMethod();
        break;
        case "Update an employee's manager":
        updateManagerMethod();
        break;
        case "Add an employee":
        addEmployeeMethod();
        break;
        case "Delete an Employee":
        deleteEmployeeMethod();
        break;
        case "View the budget of each department":
        departmentByBudget();
        break;
        case "Quit":
            console.log("Goodbye!");
            process.exit();
        break;
      }

    });
 };

 addDepartmentMethod = function (){
    inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is the name of the new department?",
    })
    //destructure name from the prompt object
    .then(({ name }) => {
      addDepartment(name);
      console.log(`The ${name} department was added to the database.`);
    })
 };

 deleteDepartmentMethod = function (){
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
      deleteDepartment(name);
      console.log(`The ${name} department was deleted from the database.`);
 })
});
 };

addRoleMethod = function (){
    db.query(`SELECT id, name FROM department`, (err, rows) => {
        const deptChoices = rows.map(row => { 
            return { value: row.id, name: row.name }
        });
        const choices = addRoleInq(deptChoices);

        inquirer
        .prompt(choices)
        //destructure name from the prompt object
        .then(({ title, salary, department }) => {
          addRole(title, salary, department);
          console.log(`The ${title} role was added to the database.`)
        })
    })
};

deleteRoleMethod = function(){
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
      deleteRole(title);
      console.log(`The ${title} role was deleted from the database.`);
 });
});
};

updateRoleMethod = function (){
    db.query(`SELECT title FROM roles`, (err, rows) => {
        const roleChoices = rows.map(row => {
            return { value: row.title, name: row.title }
        });
        const choices = updateRoleInq(roleChoices);
        inquirer
        .prompt(choices)
        //destructure name from the prompt object
        .then(({ title, salary }) => {
          updateRole(title, salary);
          console.log(`The salary for the ${title} role has been updated in the database.`);
        })
    });
};

viewManagerMethod = function (){
    const sql = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
    FROM employees as e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE e.manager_id IS NULL`;
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
        viewEmployeeManager(manager);
      });
});
}

viewRoleMethod = function (){
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
            viewEmployeeRole(role);
        });
    });
    
};

//TODO: not reaching my then
updateManagerMethod = function (){
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
    inquirer.prompt(choices).then(console.log("Hello!")
        // ({ employee, manager }) => {
        // console.log(employee);
        // console.log(manager);
        // updateEmployee(employee, manager);
        // console.log(`${employee}'s manager was updated in the database.`); }
    )
    });
});
};

addEmployeeMethod = function (){
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
                addEmployee( first, last, role, manager );
                console.log(
                    `${first} ${last} was added to the database.`
                  );
            })
        });
});
};

deleteEmployeeMethod = function (){
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
            deleteEmployee(employee);
            //not showing up
            console.log(`${employee} has been deleted from the database.`);
          })
    });
    };

//call welcome mesage
welcomeMessage();