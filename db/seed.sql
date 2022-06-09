INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('Accounting'),
('Human Resources'),
('Reception'),
('Product Oversight'),
('Warehouse');

INSERT INTO roles (title, salary, department_id)
VALUES
('Regional Manager', 80000, 1),
('Sales Representative', 62000, 2),
('Senior Accountant', 50000, 3),
('Human Resources Representative', 85000, 4),
('Receptionist', 41500, 5),
('Quality Assurance Representative', 50000, 6),
('Warehouse Foreman', 65000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, NULL),
('Jim', 'Halpert', 2, 1),
('Angela', 'Martin', 3, 1),
('Toby', 'Flenderson', 4, 1),
('Pam', 'Beesly', 5, 1),
('Creed', 'Bratton', 6, 1),
('Darryl', 'Philbin', 7, 1);