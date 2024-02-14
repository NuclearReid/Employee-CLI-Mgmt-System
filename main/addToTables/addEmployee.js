const inquirer = require('inquirer');

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
    await inquirer.prompt(newEmployeeName)
    .then((newEmployeeName) => {
        console.log(newEmployeeName);
        return newEmployeeName;
    })
    .catch(err => {
        console.error('Unable to get their first & last name');
    });


    // second inquirer prompt

    // get the different roles that are in the table and display them as a list
    // ie: SHOW title FROM roles
    // show the different roles as a list
    // get the value of what the user selects and store it
    db.query('SELECT id, title FROM roles', async (err, results)=> {
        if(err){
            console.error('Could not get the roles');
            init();
            return;
        }
        const roleChoices = results.map(results => ({
            name: results.title,
            value: results.id
        }));
        const employeeRole = [
            {
                type: 'list',
                name: 'theirRole',
                choices: roleChoices
            }
        ];
        await inquirer.prompt(employeeRole)
        .then((role) => {
            // console.log(role);
            return role;
        })
        .catch(err => {
            console.error('Unable to get their role');
        })
    }); 

    // third inquerer prompt
// get the names of all the managers and display them as a list
// get what the manager selection and store it

// Use the manager's first_name to get their employee_id and set that to the new employee's 'manager_id'

// console.log(`So far i've gathered their name ${newEmployeeName} and ${role}`);





}


module.exports = addEmployee;




// first inquirer prompt
// get their first/last name and return that value

// second inquirer prompt

// get the different roles that are in the table and display them as a list
// ie: SHOW title FROM roles
// show the different roles as a list
// get the value of what the user selects and store it

// third inquerer prompt
// get the names of all the managers and display them as a list
// get what the manager selection and store it

// Use the manager's first_name to get their employee_id and set that to the new employee's 'manager_id'