require('dotenv').config();

const inquirer = require('inquirer');
const cTable = require('console.table');

let connection;

console.log(`================`);
console.log(`Employee Tracker`);
console.log(`================`);

// Main Menu for tracker
async function mainMenu() {
    connection = await require('./database');

    const response = await inquirer.prompt([{
        type: 'list',
        name: 'main',
        message: 'Please pick an option: ',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }]);

    switch (response.main) {
        case 'View all departments':
            await displayDepartments();
            break;
        case 'View all roles':
            await displayRoles();
            break;
        case 'View all employees':
            await displayEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployee();
            break;
    }
}

// Get list of employees
async function getEmployeesForInquirer() {
    let employees = {};

    const [employeeRows] = await connection.query('SELECT id, CONCAT(last_name, ", ", first_name) AS name FROM employees ORDER BY last_name, first_name');

    employeeRows.forEach((employee) => employees[employee.name] = employee.id);

    return employees;
}

// Get list of roles
async function getRolesForInquirer() {
    let roles = {};

    const [roleRows] = await connection.query('SELECT * FROM roles');

    roleRows.forEach((role) => roles[role.title] = role.id);

    return roles;
}

// View All Departments
async function displayDepartments() {
    const [rows, fields] = await connection.execute('SELECT * FROM departments ORDER BY id');
    console.table(rows);

    mainMenu();
}

// View All Roles
async function displayRoles() {
    const [rows, fields] = await connection.execute('SELECT * FROM roles');
    console.table(rows);

    mainMenu();
}

// View All Employees
async function displayEmployees() {
    const [rows, fields] = await connection.execute('SELECT * FROM employees');
    console.table(rows);

    mainMenu();
}

// Add a Department
async function addDepartment() {
    const response = await inquirer.prompt([{
        type: 'input',
        name: 'newDepartmentName',
        message: "What is the new department's name?",
    }]);

    try {
        await connection.query('INSERT INTO departments (department_name) VALUE (?)',
            [
                response.newDepartmentName
            ]);

        console.log(`${(response.newDepartmentName)} was added successfully.\n`);
    } catch (e) {
        console.log(`Department '${response.newDepartmentName}' already exists.\n`);
    }

    mainMenu();
}

// Get list of departments for new role
async function addRole() {
    let departments = {};

    const [rows, fields] = await connection.query('SELECT * FROM departments');

    rows.forEach((role) => {
        departments[role.department_name] = role.id;
    });

    displayAddRolePrompt(departments);
}

// Add new Role
async function displayAddRolePrompt(departments) {
    const response = await inquirer.prompt([{
            type: 'input',
            name: 'newRoleName',
            message: 'What is this role named?'
        },
        {
            type: 'number',
            name: 'newRoleSalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: 'What department is this role in?',
            choices: Object.keys(departments)
        }
    ]);

    try {
        await connection.query('INSERT INTO roles (title, salary, department_id) VALUE (?, ?, ?)',
            [
                response.newRoleName,
                response.newRoleSalary,
                departments[response.newRoleDepartment]
            ]);
        console.log(`${(response.newRoleName)} was added successfullly. \n`);
    } catch (e) {
        console.log(`Role '${response.newRoleName}' already exists. \n`);
    }

    mainMenu();
}

// Get list of roles and employees for new employee
async function addEmployee() {
    const roles = await getRolesForInquirer();
    const employees = {
        None: null,
        ...(await getEmployeesForInquirer())
    };

    displayAddEmployeePrompt(roles, employees);
}

// Add new Employee
async function displayAddEmployeePrompt(roles, employees) {
    const response = await inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is the employee's role?",
            choices: Object.keys(roles)
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is the employee's manager?",
            choices: Object.keys(employees)
        }
    ]);
    try {
        await connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)',
            [
                response.firstName,
                response.lastName,
                roles[response.employeeRole],
                employees[response.employeeManager]
            ]);

        console.log(`${(response.firstName)} ${(response.lastName)} was added successfully. \n`);
    } catch (e) {
        console.log(e.message);
    }
    mainMenu();
}

async function updateEmployee() {
    console.log('update employee');

    const employees = await getEmployeesForInquirer();
    const roles = await getRolesForInquirer();

    displayUpdateEmployeePrompt(employees, roles);
}

// Update an existing employee
async function displayUpdateEmployeePrompt(employees, roles) {
    const response = await inquirer.prompt([{
            type: 'list',
            name: 'updateAnEmployee',
            message: 'What employee would you like to update?',
            choices: Object.keys(employees)
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: 'What is the updated role for this employee?',
            choices: Object.keys(roles)
        }
    ]);
    try {
        await connection.query('UPDATE employees SET role_id = ? WHERE id = ?',
            [
                roles[response.updatedRole],
                employees[response.updateAnEmployees]
            ]);
        console.log(`The employee has been updated successfully.`);
    } catch (e) {
        console.log(e.message);
    }

    mainMenu();
}

mainMenu();