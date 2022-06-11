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
  database: 'employee_db',
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
    .then(response => {
        switch (response.action) {
            case 'View all departments':
                viewAllDepartments();
                break; 
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
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
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
};

const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
}

