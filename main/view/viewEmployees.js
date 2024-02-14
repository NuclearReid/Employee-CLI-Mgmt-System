// const init = require('../index');


function viewEmployeeInfo(db, init){
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary AS Salary, d.name AS Department, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id;`
    db.query(sql, (err, results) =>{
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        init();
    });
}

module.exports = viewEmployeeInfo;