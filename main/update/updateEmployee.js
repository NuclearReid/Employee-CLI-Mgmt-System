const inquirer = require('inquirer');

async function updateEmployee(db, init){
    console.log('inside updateEmployee()');
    let currentEmployees;
    try {
        currentEmployees = await db.promise().query(`
        SELECT id AS value, CONCAT(first_name, ' ', last_name)
        AS name FROM employees`)
    }
    
    catch(err){  
        console.error('unable to get the name from the database', err);
    }

    let roles;
    try{
        roles = await db.promise().query(`
        SELECT id AS value, title AS name FROM roles`);
    }
    catch(err){
        console.error('unable to get the role info', err);
    }

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
        await db.promise().query(
            `UPDATE employees SET role_id=? WHERE id=?`,[picked.newRole, picked.pickedEmployee]
        );
        console.log(`${picked.pickedEmployee} has been give the new role of ${picked.newRole}`);
    }
    catch (err){
        console.error('unable to update the table', err);
    }
    init();

}

module.exports = updateEmployee;



// async function updateEmployee( db, init){
//     db.query('SELECT id, first_name FROM employees', async (err, results) => {
//         if(err){
//             console.error("couldn't get the list of employee names");
//             init();
//             return;
//         }
//         const employeeChoices = results.map(results => ({
//             name: results.first_name,
//             value: results.id
//         }));
    
    
//     const chosenEmployee = [
//         {
//             type: 'list',
//             message: 'pick the employee',
//             choices: employeeChoices

//         }
//     ];
//     const selectedEmployee = await inquirer.prompt(chosenEmployee)
//     .catch(err => {
//         console.error('Unable to get that employee');
//     })

//     db.query('SELECT id, title FROM roles', async (err, results) => {
//         if(err){
//             console.error('unable to get the list of roles');
//             init();
//             return;
//         }
//         const roleChoices = results.map(results => ({
//             name: results.title,
//             value: results.id
//         }));
//         const chosenRole = [
//             {
//                 type: 'list',
//                 message: 'What role do you want them to have?',
//                 choices: roleChoices
//             }
//         ];
//         const selectedRole = await inquirer.prompt(chosenRole)
//         .catch(err => {
//             console.error('Unable to select the role');
//         })
//         //where to insert into the table

//     })


//     })  


// }
