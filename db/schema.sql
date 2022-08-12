    DROP DATABASE IF EXISTS employee_db;
    CREATE DATABASE employee_db;

    USE employee_db;

    CREATE TABLE department (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30)
    );

    CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT, 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    );

    CREATE TABLE employee (
    id INT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
 
    );



INSERT INTO department (id, name)
VALUES 
    (1, 'Sales'),
    (2, 'Accounting'),
    (3, 'Human Resources');
       

 INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (101, 'Head of Sales', 75000, 1),
    (102, 'Salesman', 60000, 1),
    (103, 'Head of Accounting', 70000, 2),
    (104, 'Accountant', 50000, 2),
    (105, 'Head of Human Resources', 62000, 3),
    (106, 'HR Rep', 50000, 3);


       

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (201, 'Jim', 'Halpert', 01, null),
    (202, 'Dwight', 'Schrut', 02, 201),
    (203, 'Angela', 'Martin', 03, null),
    (204, 'Kevin', 'Malone', 04, 203),
    (205, 'Toby', 'Flenderson', 05, null),
    (206, 'Holly', 'Flax', 06, 205);