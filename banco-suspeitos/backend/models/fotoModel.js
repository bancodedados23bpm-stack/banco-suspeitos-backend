const pool = require('../config/db');
module.exports = {
  async add(suspeito_id, url) {
    const { rows } = await pool.query(
      'INSERT INTO fotos(suspeito_id, url) VALUES($1, $2) RETURNING *',
      [suspeito_id, url]
    );
    return rows[0];
  },
  async getLastBySuspeito(suspeito_id) {
    const { rows } = await pool.query(
      'SELECT * FROM fotos WHERE suspeito_id=$1 ORDER BY data_upload DESC LIMIT 1',
      [suspeito_id]
    );
    return rows[0];
  },
  async getAllBySuspeito(suspeito_id) {
    const { rows } = await pool.query(
      'SELECT * FROM fotos WHERE suspeito_id=$1 ORDER BY data_upload DESC',
      [suspeito_id]
    );
    return rows;
  },
  async countBySuspeito(suspeito_id) {
    const { rows } = await pool.query(
      'SELECT COUNT(*) FROM fotos WHERE suspeito_id=$1',
      [suspeito_id]
    );
    return parseInt(rows[0].count, 10);
  }
}
