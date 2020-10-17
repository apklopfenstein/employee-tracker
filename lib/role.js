const inquirer = ('inquirer');

const addRoleQuestions = [{
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
    type: 'input',
    name: 'newRoleDepartment',
    message: 'What department is this role in?'
}]