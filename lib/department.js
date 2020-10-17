const { listenerCount } = require("process");

const inquirer = ('inquirer');

const startQuestion = [{
    type: 'list',
    name: 'startList',
    message: 'Please pick an option: ',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
}]

const addDepartmentQuestion = [{
    type: 'input',
    name: 'newDepartmentName',
    message: "What is the new department's name?",
}]