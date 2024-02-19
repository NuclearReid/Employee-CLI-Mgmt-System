// displays the role titles
function viewRoles(db, init){
    const sql = `
    SELECT roles.id AS role_id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
    `;
    db.query(sql, (err, results) => {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        init();
    });
}

module.exports = viewRoles;