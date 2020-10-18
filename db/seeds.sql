INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ashley', 'Rodriguez', 3, null),
    ('John', 'Doe', 1, 1),
    ('Mike', 'Chan', 2, 2),
    ('Kevin', 'Tupik', 4, 1),
    ('Christian', 'Eckenrode', 5, null),
    ('Malia', 'Brown', 6, null),
    ('Sarah', 'Lourd', 7, null),
    ('Tom', 'Allen', 8, 3);