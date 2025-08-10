const pool = require('../config/db');
module.exports = {
  async create(nome, email, senha, role) {
    const { rows } = await pool.query(
      'INSERT INTO users(nome, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *',
      [nome, email, senha, role]
    );
    return rows[0];
  },
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return rows[0];
  }
}
