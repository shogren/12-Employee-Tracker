USE employeeDB;

INSERT INTO department (name)
VALUES 
("Engineering"),
("Finance"),
("Sales"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("Software Engineer", 120000, 1),
("Sales Lead", 100000, 3),
("Lead Engineer", 150000, 1),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Shogren", 1, 3);