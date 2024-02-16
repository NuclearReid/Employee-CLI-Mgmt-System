const inquirer = require('inquirer');



function addDepartment(db, init){
    // lets the user type in the name of the new department
    const addDepartmentQuestion = [
        {
            type:'input',
            message: 'What is the name of the new Department?',
            name: 'newDepartment'
        }
    ];

    inquirer.prompt(addDepartmentQuestion)
    .then((answers) => {
        // inserts that string into the department table under (name)
        db.query('INSERT INTO departments(name) VALUES (?)',
        [answers.newDepartment],
        (err, result) => {
            if(err){
                console.error('Error adding the new Department');
            }
            else{
                console.log('the department has been added');
            }
            init();
        }
        );
    })
    .catch(err => {
        console.error('Error with inquirer');
    });

}

module.exports = addDepartment;