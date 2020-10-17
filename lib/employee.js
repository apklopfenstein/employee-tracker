const inquirer = ('inquirer');

const addEmployeeQuestions = [{
    type: 'input',
    name: 'employeeFirstName',
    message: "What is the employee's first name?"
},
{
    type: 'input',
    name: 'employeeLastName',
    message: "What is the employee's last name?"
},
{
    type: 'input',
    name: 'employeeRole',
    message: "What is the employee's role?"
},
{
    type: 'input',
    name: 'employeeManager',
    message: "Who is the employee's manager?"
}]