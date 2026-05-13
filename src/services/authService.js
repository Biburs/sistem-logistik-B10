const db = require('../config/database');

const findUserByEmail = (email, callback) => {

    const query = `
        SELECT *
        FROM users
        WHERE email = ?
    `;

    db.query(query, [email], callback);
};

module.exports = {
    findUserByEmail
};