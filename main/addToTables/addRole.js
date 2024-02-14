const inquirer = require('inquirer');

function addRole(db, init){
    db.query('SELECT name FROM departments', (err, results) =>{
        if(err){
            console.error('Could not get the department names');
            init();
            return;
        }
        const departmentNames = results.map(result => result.name);
        
        const addRoleQuestions = [
        {
            type:'input',
            message: 'What is the title of the new Role?',
            name: 'title'
        },
        {
            type:'list',
            name: 'departmentNames',
            message: 'Select one of the departments',
            choices: departmentNames
        }

    ];
        inquirer.prompt(addRoleQuestions)
        .then((answers) => {
            console.log(answers);
        })
        .catch(err => {
            console.error('Error with inquirer');
        });
    });
}


module.exports = addRole;
// INSERT INTO roles(title, salary)
// VALUES ('New Role', VARCHAR(30)),
//        ('000000',    INT);