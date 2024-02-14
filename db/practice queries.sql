-- the Queries from the acceptance criteria

-- show departments --
SELECT name FROM department;

-- show all roles --
SELECT title FROM role; 

-- show all employees --

            --- get the employee data including the manager's names    ------
SELECT e.id, e.first_name, e.last_name, r.title, r.salary AS Salary, d.name AS Department, 
CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;


-- Adding a Department --
INSERT INTO departments (name) 
VALUES ('New Department');

-- Add a role --
INSERT INTO roles(title, salary)
VALUES ('New Role', VARCHAR(30)),
       ('000000',    INT);
--- The user will also have to punch in the manager, figure that out --


-- Update an employee --
UPDATE employee
SET title = 'new Title',
WHERE first_name = 'Entered Name';