// gets mysql, inqurierer, and all the files needed
const mysql = require('mysql2');
const inquirer = require('inquirer');
const viewDepartment = require('./view/viewDepartment');
const viewEmployees = require('./view/viewEmployees');
const viewRoles = require('./view/viewRoles');
const addRole = require('./addToTables/addRole');
const addDepartment = require('./addToTables/addDepartment');
const addEmployee = require('./addToTables/addEmployee');
const updateEmployee = require('./update/updateEmployee');

// creates the connection to my databases
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'staffmgmt_db'
    },
);
// if there's an error in the connection
db.connect((err) => {
    if (err){
        console.error('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to the staffmgmt_db');
    init();
});

// the first lot of questions, gets what the user wants to do
const initialQuestion = [
    {
        type: 'list',
        name: 'firstQuestion',
        message: 'What would you like to do?',
        choices:['View all departments','View all roles', 'View all employees',
                 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'] 
    }
]
function init() {
    inquirer.prompt(initialQuestion)
    .then((choice) => {
        switch (choice.firstQuestion) {
            // Display the name of each department
            case 'View all departments':
                viewDepartment(db, init);
                break;
            // Displays the title of each role
            case 'View all roles':
                viewRoles(db, init);
                break;
            // Displays the name, title, salary, department, and manager for each employee
            case 'View all employees':
                viewEmployees(db, init);
                break;
            // add a new role
            case 'Add a role':
                addRole(db, init);
                break;
            // add a department
            case 'Add a department':
                addDepartment(db, init);
                break;
            // add an employee (this was the complicated one)
            case 'Add an employee':
                addEmployee(db, init);
                break;
            case 'Update an employee role':
                updateEmployee(db, init);
                break;
            // Quit the program            
            case 'Quit':
                db.end();
                break;
            default:
                db.end();
                break;
        }
    });
}


module.exports = init;