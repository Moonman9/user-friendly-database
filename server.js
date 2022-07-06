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

// prompts user to  chose an action to perform
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
    // based off of user response; will choose function to complete task
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

// function using queries to look for and populate department table in the terminal
const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
};

// function using queries to look for and populate roles table in the terminal
const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
};

// function using queries to look for and populate employees table in the terminal
const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', function(err, res) {
        if(err) throw err;
        console.table(res);
        initialPrompt();
    });
};

// initiates question for adding departments
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department you would like to add'
        },
    ])
    //uses queries to input information into department table
    .then(input => {
        connection.query(
            'INSERT INTO department (name) VALUES (?)',
            [input.department],
            function(err, res) {
                if (err) throw err;
                console.log('You have successfully added a department.');
                initialPrompt();
            }
        );
    });
};

// initiates question for adding roles
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What role title would you like to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for the role you would like to add?'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the department ID number for the role you would like to add?'
        },
    ])
    //uses queries to input information into roles table
    .then(input => {
        connection.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [input.title, input.salary, input.department_id],
            function(err, res) {
                if (err) throw err;
                console.log('You have successfully added a new role.');
                initialPrompt();
            }
        );
    });
};

// initiates question for adding roles
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is the first name of the employee you would like to add?"
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is the last name of the employee you would like to add?",
        },
        {
            name: 'role_id',
            type: 'input',
            message: "What is the role ID number of the employee you would like to add?",
        },
        {
            name: 'manager_id',
            type: 'input',
            message: "What is the manager ID number for the employee's manager?",
        },
    ])
    //uses queries to input information into employee table
    .then(input => {
        connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [input.first_name, input.last_name, input.role_id, input.manager_id],
            function(err, res) {
                if (err) throw err;
                console.log('You have successfully added a new employee.');
                initialPrompt();
            }
        )
    });
};

//update an employees role by id prompt
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID of the employee you would like to update.',
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Please enter the new desired role ID for the selected employee.',
        },
    ])
    //queries used to update an employees role id by their employee id
    .then(input => {
        connection.query(
            'UPDATE employee SET role_id=? WHERE id=?',
            [input.role_id, input.id],
            function(err, res) {
                if (err) throw err;
                console.log("You have successfully updated the employee's role ID.");
                initialPrompt();
            }
        );
    });
};
