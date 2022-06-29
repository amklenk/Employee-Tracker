INSERT INTO department (name)
 VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3), 
("Accountant", 1250000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, NULL), 
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, NULL),
("Tom", "Allen", 8, 7);

SELECT e.id, e.first_name, e.last_name, roles.title AS title, CONCAT(e2.first_name, " ", e2.last_name) AS manager, roles.salary AS salary, department.name AS department
FROM employees as e
LEFT JOIN roles ON e.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employees as e2 on e2.id = e.manager_id;