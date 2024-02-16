// the process
    // 1. gets the role id based on the title (SELECT id FROM roles WHERE title = ?)
    // 2. gets the manager's id based on their name (SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?)
    // 3. inserts all these values into the table (INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) )
    
    // side note/what this code is doing: const roleId = roleResults[0].id;
        // When the query is exicuted it would give me data for everything that would match that query
        // in this use it's not that important because there is only one result returned 
        // but I'm still useing [0] to ensure only one role is selected
    // the managerId essentially does the same thing

const addToTable = (db, init, firstName, lastName, roleName, managerName) => {
    // Query to get the role_id based on the role title sent to it
    const getRoleIdQuery = `SELECT id FROM roles WHERE title = ?`;
    // inserts the roleName into the query
    db.query(getRoleIdQuery, [roleName], (err, roleResults) => {
        if (err) {
            console.error('Error getting role id:', err);
            init();
            return;
        }
        // saves the 
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