const inquirer = require('inquirer');

function addRole(db, init){
    db.query('SELECT id, name FROM departments', (err, results) =>{
        if(err){
            console.error('Could not get the department names');
            init();
            return;
        }
        const departmentChoices = results.map(result => ({
            name: result.name,
            value: result.id
        }));
        
        const addRoleQuestions = [
        {
            type:'input',
            message: 'What is the title of the new Role?',
            name: 'title'
        },
        {
            type:'input',
            message: 'What is the salary of the new Role?',
            name: 'salary'
        },
        {
            type:'list',
            name: 'departmentId',
            message: 'Select one of the departments',
            choices: departmentChoices
        }

    ];
        inquirer.prompt(addRoleQuestions)
        .then((answers) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.title, answers.salary, answers.departmentId],
            (err, result) => {
                if(err){
                    console.error('Error putting in a new role');
                }
                else{
                    console.log('A new role has been added');
                }
                init();
            }
            );
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