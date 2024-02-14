-- the Queries from the acceptance criteria

-- show departments --
SELECT name FROM department;

-- show all roles --
SELECT title FROM role; 

-- show all employees --

SELECT * FROM employees;

            --- get the employee data including the manager's names    ------
SELECT e.id, e.first_name, e.last_name, r.title, r.salary AS Salary, d.name AS Department, 
CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;


-- i'm a bit confused how the manager/employee id relationship works

-- make a query




-- the 1 ----- * means 1 to many (look at the picture)



-- so many managers to one employee_id


