const pool = require('../db');

class User {
    static async findAll() {
        const result = await pool.query('SELECT id, email, role, created_at FROM users ORDER BY id ASC');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT id, email, role, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async deleteById(id) {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, email', [id]);
        return result.rows[0];
    }

    static async updateRole(id, role) {
        const result = await pool.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role', [role, id]);
        return result.rows[0];
    }
}

module.exports = User;