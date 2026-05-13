const db = require('../config/database');

const findUserByEmail = (email, callback) => {

    const query = `
        SELECT 
            users.id,
            users.nama,
            users.email,
            users.password,
            users.created_at,
            roles.name AS role
        FROM users
        LEFT JOIN model_has_roles 
            ON model_has_roles.model_id = users.id 
            AND model_has_roles.model_type = 'User'
        LEFT JOIN roles 
            ON roles.id = model_has_roles.role_id
        WHERE users.email = ?
        LIMIT 1
    `;

    db.query(query, [email], callback);
};

module.exports = {
    findUserByEmail
};