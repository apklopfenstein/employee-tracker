const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'alyssa',
    // Your MySQL password
    password: 'password',
    database: 'employees'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    mainMenu();
});

function mainMenu() {
    inquirer.prompt([
        {
        type: 'main',
        name: 'list',
        message: 'Please pick an option: ',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
    .then(response => {
        console.log(response)
        switch (response.main) {
            case 'View all departments':
                displayDepartments();
                break;
            case 'View all roles':
                displayRoles();
                break;
            case 'View all employees':
                displayEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee':
                updateEmployee();
                break;
        }
    });
}

function displayDepartments() {
    connection.query('SELECT * FROM departments', (error, result) => {
        if (error) throw error;
        console.table(result);
        mainMenu();
    })
}

function displayRoles() {
    connection.query('SELECT * FROM roles', (error, result) => {
        if (error) throw error;
        console.table(result);
        mainMenu();
    })
}

function displayEmployees() {
    connection.query('SELECT * FROM employees', (error, result) => {
        if (error) throw error;
        console.table(result);
        mainMenu();
    })
}
    
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: "What is the new department's name?",
        }
    ])
    .then()
}

function addRole() {
    inquirer.prompt([
        {
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
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    ])
    .then((response) => {
        connection.query('INSERT INTO roles SET = ?', 
            {

            })
    })
}


function addEmployee() {
    inquirer.prompt([
        {
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
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Account Manager', 'Lawyer', 'Legal Team Lead']
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is the employee's manager?",
            choices: ['None', 'Ashley Rodriguez', 'Sarah Lourd', 'John Doe']
        }
    ])
    .then((response) => {
        connection.query('INSERT INTO employees SET = ?',
            {
                first_name: response.firstName,
                last_name: response.lastName,
                manager_id: managerId,
                role_id: roleId
            },
            function (err) {
                if (err) throw err;
                console.table(`${(res.firstname, res.lastname)} was successfully added. \n`);
            });
            mainMenu();
    });
}
