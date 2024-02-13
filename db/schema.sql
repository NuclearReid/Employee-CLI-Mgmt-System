DROP DATABASE IF EXISTS staffmgmt_db;
CREATE DATABASE staffmgmt_db;

USE staffmgmt_db;

CREATE TABLE departments(
    id      INT            NOT NULL                 AUTO_INCREMENT  PRIMARY KEY,
    name    VARCHAR(30)    NOT NULL
);

CREATE TABLE roles(
    id                 INT            NOT NULL      AUTO_INCREMENT  PRIMARY KEY,
    title              VARCHAR(30)    NOT NULL,
    salary             DECIMAL        NOT NULL,
    department_id      INT            NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees(
    id                 INT            NOT NULL      AUTO_INCREMENT  PRIMARY KEY,
    first_name         VARCHAR(30),
    last_name          VARCHAR(30),
    role_id            INT,
    manager_id         INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);