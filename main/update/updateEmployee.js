const inquirer = require('inquirer');



async function updateEmployee(db, init){
    let currentEmployees;
    try {
        // gets the name of the employees
        currentEmployees = await db.promise().query(`
        SELECT id AS value, CONCAT(first_name, ' ', last_name)
        AS name FROM employees`)
    }
    
    catch(err){  
        console.error('unable to get the name from the database', err);
    }

    let roles;
    try{
        // gets the titles of the roles
        roles = await db.promise().query(`
        SELECT id AS value, title AS name FROM roles`);
    }
    catch(err){
        console.error('unable to get the role info', err);
    }
    // displays them with inquirer
    const choices = [
        {
            type: 'list',
            message: 'Pick an employee',
            name: 'pickedEmployee',
            choices: currentEmployees[0]
        },
        {
            type: 'list',
            message: 'Pick their new role',
            name: 'newRole',
            choices: roles[0]
        }
    ]

    const picked = await inquirer.prompt(choices);

    try {
        // updates the tables with these new values
        await db.promise().query(
            `UPDATE employees SET role_id=? WHERE id=?`,[picked.newRole, picked.pickedEmployee]
        );
        console.log(`Employee has been updated`);
    }
    catch (err){
        console.error('unable to update the table', err);
    }
    init();

}

module.exports = updateEmployee;
