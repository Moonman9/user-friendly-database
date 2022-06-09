// get the client
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'youshallpass',
});

// connection result
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the Employee Database'); // results connected log
    initialPrompt();
});

const initialPrompt = () => {
    inquirer.prompt({
        message: 'What would you like to do?',
        name: 'action',
        type: 'list',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role',
            'Exit',
        ],
    })
}