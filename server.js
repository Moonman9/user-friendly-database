// get the client
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_db',
  password: 'youShallPass1',
  port: 3001,
});

// simple query
connection.connect(err => {
    if (err) throw err;
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
});
