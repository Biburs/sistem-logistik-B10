const db = require('../config/database');

const findUserByEmail = (email, callback) => {

    const query = `
        SELECT users.*, roles.name AS role
        FROM users
        LEFT JOIN model_has_roles
        ON users.id = model_has_roles.model_id
        LEFT JOIN roles
        ON roles.id = model_has_roles.role_id
        WHERE users.email = ?
    `;

    db.query(query, [email], callback);
};

module.exports = {
    findUserByEmail
};