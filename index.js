//require
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/connection");
const {
  getDepartments,
  addDepartment,
  deleteDepartment,
  departmentByBudget,
} = require("./lib/Department");
const { getRoles, addRole, deleteRole, updateRole } = require("./lib/Roles");
const {
  getEmployees,
  viewEmployeeManager,
  viewEmployeeRole,
  updateEmployeeManager,
  updateEmployeeRole,
  addEmployee,
  deleteEmployee,
} = require("./lib/Employees");

//Inquirer Arrays
choicesArr = [
  "View all departments",
  "Add a department",
  "Delete a department",
  "View all roles",
  "Add a role",
  "Delete a role",
  "Update a role's salary",
  "View all employees",
  "View an employee by their manager",
  "View an employee by their role",
  "Update an employee's role",
  "Update an employee's manager",
  "Add an employee",
  "Delete an Employee",
  "View the budget of each department",
  "Quit",
];

addRoleInq = function (departmentChoices) {
  return [
    {
      type: "text",
      name: "title",
      message: "What is the title of the new role?",
      validate: (titleInput) => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter the title of the new role.");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "salary",
      message: "What is the salary of the new role?",
      validate: (salaryInput) => {
        if (salaryInput) {
          return true;
        } else {
          console.log("Please enter the salary of the new role.");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "department",
      message: "What is the department of the new role?",
      choices: departmentChoices,
    },
  ];
};

updateRoleInq = function (roleChoices) {
  return [
    {
      type: "list",
      name: "title",
      message: "Which role would you like to update?",
      choices: roleChoices,
    },
    {
      type: "text",
      name: "salary",
      message: "What is the new salary of the role?",
      validate: (salaryInput) => {
        if (salaryInput) {
          return true;
        } else {
          console.log("Please enter the new salary.");
          return false;
        }
      },
    },
  ];
};

addEmployeeInq = function (rolesChoices, managerChoices) {
  return [
    {
      type: "text",
      name: "first",
      message: "What is the employee's first name?",
      validate: (firstInput) => {
        if (firstInput) {
          return true;
        } else {
          console.log("Please enter the first name of the new employee.");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "last",
      message: "What is the employee's last name?",
      validate: (lastInput) => {
        if (lastInput) {
          return true;
        } else {
          console.log("Please enter the last name of the new employee.");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "role",
      message: "Which role will this employee have?",
      choices: rolesChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Which manager will be the employee's manager?",
      choices: managerChoices,
    },
  ];
};

updateEmployeeRoleInq = function (employeeChoices, rolesChoices) {
  return [
    {
      type: "list",
      name: "employee",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role",
      message: "Which role is the employee's new role?",
      choices: rolesChoices,
    },
  ];
};

updateEmployeeManagerInq = function (employeeChoices, managerChoices) {
  return [
    {
      type: "list",
      name: "employee",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Which manager is the employee's new manager?",
      choices: managerChoices,
    },
  ];
};

//functions to run the program
welcomeMessage = function () {
  console.log(
    logo({
      name: "Employee Tracker",
      font: "Broadway KB",
      lineChars: 10,
      padding: 2,
      margin: 2,
      borderColor: "grey",
      logoColor: "bold-blue",
      textColor: "blue",
    }).render()
  );
  startProgram();
};

startProgram = function () {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: choicesArr,
    })
    .then(({ action }) => {
      switch (action) {
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
        case "Update an employee's role":
          updateEmployeeRoleMethod();
          break;
        case "Update an employee's manager":
          updateEmployeeManagerMethod();
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
      }
    });
};

addDepartmentMethod = function () {
  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is the name of the new department?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter the name of the new department.");
          return false;
        }
      },
    })
    .then(({ name }) => {
      console.log(`The ${name} department was added to the database.`);
      addDepartment(name);
    });
};

deleteDepartmentMethod = function () {
  db.query(`SELECT name FROM department`, (err, rows) => {
    const deptChoices = rows.map((row) => {
      return { value: row.name, name: row.name };
    });
    inquirer
      .prompt({
        type: "list",
        name: "name",
        message: "Which department would you like to delete?",
        choices: deptChoices,
      })
      //destructure name from the prompt object
      .then(({ name }) => {
        console.log(`The ${name} department was deleted from the database.`);
        deleteDepartment(name);
      });
  });
};

addRoleMethod = function () {
  db.query(`SELECT id, name FROM department`, (err, rows) => {
    const deptChoices = rows.map((row) => {
      return { value: row.id, name: row.name };
    });
    const choices = addRoleInq(deptChoices);

    inquirer
      .prompt(choices)
      //destructure name from the prompt object
      .then(({ title, salary, department }) => {
        console.log(`The ${title} role was added to the database.`);
        addRole(title, salary, department);
      });
  });
};

deleteRoleMethod = function () {
  db.query(`SELECT title FROM roles`, (err, rows) => {
    const roleChoices = rows.map((row) => {
      return { value: row.title, name: row.title };
    });
    inquirer
      .prompt({
        type: "list",
        name: "title",
        message: "Which role would you like to delete?",
        choices: roleChoices,
      })
      .then(({ title }) => {
        console.log(`The ${title} role was deleted from the database.`);
        deleteRole(title);
      });
  });
};

updateRoleMethod = function () {
  db.query(`SELECT title FROM roles`, (err, rows) => {
    const roleChoices = rows.map((row) => {
      return { value: row.title, name: row.title };
    });
    const choices = updateRoleInq(roleChoices);
    inquirer
      .prompt(choices)
      //destructure name from the prompt object
      .then(({ title, salary }) => {
        console.log(
          `The salary for the ${title} role has been updated in the database.`
        );
        updateRole(title, salary);
      });
  });
};

viewManagerMethod = function () {
  const sql = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
    FROM employees as e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE e.manager_id IS NULL`;
  db.query(sql, (err, rows) => {
    const managerChoices = rows.map((row) => {
      return { value: row.manager, name: row.manager };
    });
    inquirer
      .prompt({
        type: "list",
        name: "manager",
        message: "Select a manager to see their employees.",
        choices: managerChoices,
      })
      .then(({ manager }) => {
        viewEmployeeManager(manager);
      });
  });
};

viewRoleMethod = function () {
  const sql = `SELECT id, title
    FROM roles`;
  db.query(sql, (err, rows) => {
    const rolesChoices = rows.map((row) => {
      return { value: row.id, name: row.title };
    });
    inquirer
      .prompt({
        type: "list",
        name: "role",
        message: "Select the role to see the employees.",
        choices: rolesChoices,
      })
      .then(({ role }) => {
        viewEmployeeRole(role);
      });
  });
};

updateEmployeeRoleMethod = function () {
  db.query(
    `SELECT CONCAT (first_name, " ", last_name) AS employee_name FROM employees`,
    (err, rows) => {
      const employeeChoices = rows.map((row) => {
        return { value: row.employee_name, name: row.employee_name };
      });
      db.query(
        `SELECT id, title
    FROM roles`,
        (err, rows) => {
          const rolesChoices = rows.map((row) => {
            return { value: row.id, name: row.title };
          });
          const choices = updateEmployeeRoleInq(employeeChoices, rolesChoices);
          inquirer.prompt(choices).then(({ employee, role }) => {
            console.log(`${employee}'s role was updated in the database.`);
            updateEmployeeRole(employee, role);
          });
        }
      );
    }
  );
};

updateEmployeeManagerMethod = function () {
  db.query(
    `SELECT CONCAT (first_name, " ", last_name) AS employee_name FROM employees`,
    (err, rows) => {
      const employeeChoices = rows.map((row) => {
        return { value: row.employee_name, name: row.employee_name };
      });

      const sql = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS manager 
    FROM employees as e 
    LEFT JOIN roles ON e.role_id = roles.id 
    LEFT JOIN department ON roles.department_id = department.id 
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE e.manager_id IS NULL`;
      db.query(sql, (err, rows) => {
        const managerChoices = rows.map((row) => {
          return { value: row.id, name: row.manager };
        });
        const choices = updateEmployeeManagerInq(
          employeeChoices,
          managerChoices
        );
        inquirer.prompt(choices).then(({ employee, manager }) => {
          console.log(`${employee}'s manager was updated in the database.`);
          updateEmployeeManager(employee, manager);
        });
      });
    }
  );
};

addEmployeeMethod = function () {
  db.query(
    `SELECT e.role_id, roles.title AS title
    FROM employees as e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS e2 ON e2.id = e.manager_id
    WHERE roles.title IS NOT NULL`,
    (err, rows) => {
      const rolesChoices = rows.map((row) => {
        return { value: row.role_id, name: row.title };
      });
      const sql = `SELECT e.manager_id, CONCAT(e2.first_name, " ", e2.last_name) AS manager 
        FROM employees as e
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id 
        LEFT JOIN employees AS e2 ON e2.id = e.manager_id
        WHERE e.manager_id IS NOT NULL`;
      db.query(sql, (err, rows) => {
        const managerChoices = rows.map((row) => {
          return { value: row.manager_id, name: row.manager };
        });
        const roleManager = addEmployeeInq(rolesChoices, managerChoices);
        inquirer.prompt(roleManager).then(({ first, last, role, manager }) => {
          console.log(`${first} ${last} was added to the database.`);
          addEmployee(first, last, role, manager);
        });
      });
    }
  );
};

deleteEmployeeMethod = function () {
  db.query(
    `SELECT CONCAT (first_name, " ", last_name) AS employee_name FROM employees`,
    (err, rows) => {
      const employeeChoices = rows.map((row) => {
        return { value: row.employee_name, name: row.employee_name };
      });

      inquirer
        .prompt({
          type: "list",
          name: "employee",
          message: "Which employee would you like to delete?",
          choices: employeeChoices,
        })
        .then(({ employee }) => {
          console.log(`${employee} has been deleted from the database.`);
          deleteEmployee(employee);
        });
    }
  );
};

//call welcome mesage
welcomeMessage();
