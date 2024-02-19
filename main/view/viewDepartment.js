
// Displays the name of each department
function viewDepartment(db, init) {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        init();
    });
}

module.exports = viewDepartment;