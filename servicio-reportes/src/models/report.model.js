const pool = require('../db');

class Report {
    static async create({ title, content, userId }) {
        const result = await pool.query(
            'INSERT INTO reports (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, content, userId]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
        return result.rows;
    }

    static async findAllByUserId(userId) {
        const result = await pool.query('SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM reports WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, { title, content }) {
        const result = await pool.query(
            'UPDATE reports SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        return result.rows[0];
    }

    static async deleteById(id) {
        const result = await pool.query('DELETE FROM reports WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    
    static async updateStatus(id, status) {
        const result = await pool.query('UPDATE reports SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
        return result.rows[0];
    }
}

module.exports = Report;