// displays the role titles
function viewRoles(db, init){
    const sql = 'SELECT title FROM roles';
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