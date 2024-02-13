USE staffmgmt_db;

INSERT INTO departments (name) VALUES
('Sales'),
('Marketing'),
('Engineering');

INSERT INTO roles (title, salary, department_id) VALUES
('Sales Manager', 100000, 1),
('Sales Staff', 70000, 1),
('Marketing Manager', 100000, 2),
('Marketing Staff', 70000, 2),
('Engineering Manager', 100000, 3),
('Engineering Staff', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, NULL),
('Emily', 'Brown', 4, 3),
('David', 'Lee', 5, NULL),
('Sarah', 'Wilson', 6, 5);