DROP DATABASE IF EXISTS business;
CREATE DATABASE business;
USE business;


SELECT roles.title AS title
FROM employees as e
LEFT JOIN roles ON e.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employees AS e2 ON e2.id = e.manager_id;