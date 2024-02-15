const mysql = require('mysql2');
const inquirer = require('inquirer');
const viewDepartment = require('./view/viewDepartment');
const viewEmployees = require('./view/viewEmployees');
const viewRoles = require('./view/viewRoles');
const addRole = require('./addToTables/addRole');
const addDepartment = require('./addToTables/addDepartment');
const addEmployee = require('./addToTables/addEmployee');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'staffmgmt_db'
    },
);
db.connect((err) => {
    if (err){
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to the staffmgmt_db');
    init();
});

const initialQuestion = [
    // inquirer questions go in here.
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
            case 'View all departments':
                viewDepartment(db, init);
                break;
            case 'View all roles':
                viewRoles(db, init);
                break;
            case 'View all employees':
                viewEmployees(db, init);
                break;
            case 'Add a role':
                addRole(db, init);
                break;
            case 'Add a department':
                addDepartment(db, init);
                break;
            case 'Add an employee':
                addEmployee(db, init);
                break;            
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