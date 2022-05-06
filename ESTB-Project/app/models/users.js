// Get the functions in the db.js file to use
const db = require('./../services/db');
const bcrypt = require("bcryptjs");

class User {

    // Id of the user
    user_id;

    // Email of the user
    email;

    constructor(email) {
        this.email = email;
    }

    // Get an existing user id from an email address, or return false if not found
    async getIdFromEmail() {
        var sql = "SELECT user_id FROM Users WHERE Users.email = ?";
        const result = await db.query(sql, [this.email]);
        // TODO LOTS OF ERROR CHECKS HERE..
        if (JSON.stringify(result) != '[]') {
            this.id = result[0].id;
            return this.id;
        }
        else {
            return false;
        }
    }

    // Add a password to an existing user
    async setUserPassword(password) {
        const pw = await bcrypt.hash(password, 10);
        var sql = "UPDATE Users SET password = ? WHERE Users.id = ?"
        const result = await db.query(sql, [pw, this.user_id]);
        return true;
    }

    // Add a new record to the users table    
    async addUser(password) {
        const pw = await bcrypt.hash(password, 10);
        var sql = "INSERT INTO Users (email, password) VALUES (? , ?)";
        const result = await db.query(sql, [this.email, pw]);
        console.log(result.insertId);
        this.id = result.insertId;
        return this.id;
    }

    // Test a submitted password against a stored password
    async authenticate(submitted) {
        // Get the stored, password for the user
        var sql = "SELECT password FROM Users WHERE user_id = ?";
        const result = await db.query(sql, [this.id]);
        const match = await bcrypt.compare(submitted, result[0].password);
        if (match == true) {
            return true;
        }
        else {
            return false;

        }

    }
}

module.exports = {
    User
}