const inquirer = require('inquirer');
const addToTable = require('./sendEmployeeToTable');


// this is async so it can run each inquirer prompt before using the data
    // the process
        // 1. with inquirer has the user enter in the employee name and stores that as an object
        // 2. gets the titles from the role table
        // 3. uses .map() to align the role(id) with the title
        // 4. displays the titles in a list with inquirer
        // 5. basically the same as 3 & 4 but with the manager names
        // 6. sends the data gathered to the addToTable() --> this is used in the sendEmployeeToTable.js (long file name, I know)
async function addEmployee(db, init){
    // first inquirer prompt
    // get their first/last name and return that value
    const newEmployeeName = [
        {
            type: 'input',
            message: 'what is their first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is their last name?',
            name: 'last_name'
        }
    ];
    // saves the data for the person's name
    const newEmployee = await inquirer.prompt(newEmployeeName)
    .catch(err => {
        console.error('Unable to get their first & last name');
    });
    // second inquirer prompt

    // get the different roles that are in the table and display them as a list
    // ie: SHOW title FROM roles
    // show the different roles as a list
    // get the value of what the user selects and store it

    // gets the id and title from the roles table
    db.query('SELECT id, title FROM roles', async (err, results)=> {
        if(err){
            console.error('Could not get the roles');
            init();
            return;
        }

        const roleChoices = results.map(results => ({
            name: results.title,
            value: results.title
        }));

        const employeeRole = [
            {
                type: 'list',
                name: 'theirRole',
                choices: roleChoices
            }
        ];

        const selectedRole = await inquirer.prompt(employeeRole)
        .catch(err => {
            console.error('Unable to get their role');
        })
    
    // third inquerer prompt
// get the names of all the managers and display them as a list
// get what the manager selection and store it

        // this uses manager_id IS NULL because only managers have a NULL id
        db.query((`SELECT CONCAT(first_name, " ", last_name) 
                AS manager_name 
                FROM employees 
                WHERE manager_id IS NULL`), async (err, results) => {
                    if(err){
                        console.error(`Unable to get the list of managers`);
                        init();
                        return;
                    }
                    const managerNames = results.map(result => result.manager_name);                    
                    const employeeManager = [
                    {
                        type:'list',
                        message: 'who is the manager?',
                        name: 'chosenManager',
                        choices: managerNames
                    }
                ];
                const selectedManager = await inquirer.prompt(employeeManager)
                .catch(err => {
                    console.error('Unable to select the manager');
                }); 
                console.log(`All the gathered data for the new employee name: ${newEmployee.first_name} ${newEmployee.last_name}, role ${selectedRole.theirRole}, and manager ${selectedManager.chosenManager}`);
                addToTable(db, init, newEmployee.first_name, newEmployee.last_name, selectedRole.theirRole, selectedManager.chosenManager);

            });
        });
}


module.exports = addEmployee;