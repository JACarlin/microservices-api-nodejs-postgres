const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
    static async create({ email, password }) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role',
            [email, passwordHash]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT id, email, role FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
}

module.exports = User;