

const addToTable = (db, init, firstName, lastName, roleName, managerName) => {
    // Query to get the role_id based on the role name
    const getRoleIdQuery = `SELECT id FROM roles WHERE title = ?`;

    // sends that query to SQL
    db.query(getRoleIdQuery, [roleName], (err, roleResults) => {
        if (err) {
            console.error('Error getting role id:', err);
            init();
            return;
        }

        const roleId = roleResults[0].id;

        // Query to get the manager_id based on the manager's name
        const getManagerIdQuery = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`;
        
        //  sends that query to get the manager info
        db.query(getManagerIdQuery, [managerName], (err, managerResults) => {
            if (err) {
                console.error('Error getting manager id:', err);
                init();
                return;
            }

            const managerId = managerResults[0].id;

            // Insert the new employee into the employees table
            const insertEmployeeQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

            db.query(insertEmployeeQuery, [firstName, lastName, roleId, managerId], (err) => {
                if (err) {
                    console.error('Error adding employee:', err);
                    init();
                    return;
                }

                console.log('Employee added successfully!');
                init();
            });
        });
    });
};

module.exports = addToTable;