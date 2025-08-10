const pool = require('../config/db');
module.exports = {
  async create(data) {
    const { rows } = await pool.query(
      `INSERT INTO suspeitos
      (nome, data_nascimento, sexo, cpf, rg, nome_mae, apelido, artigo, endereco, carro, observacoes, etiquetas)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [data.nome, data.data_nascimento, data.sexo, data.cpf, data.rg, data.nome_mae,
       data.apelido, data.artigo, data.endereco, data.carro, data.observacoes, data.etiquetas],
    );
    return rows[0];
  },
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM suspeitos ORDER BY id DESC');
    return rows;
  },
  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM suspeitos WHERE id=$1', [id]);
    return rows[0];
  },
  async update(id, data) {
    const { rows } = await pool.query(
      `UPDATE suspeitos SET
        nome=$1, data_nascimento=$2, sexo=$3, cpf=$4, rg=$5, nome_mae=$6,
        apelido=$7, artigo=$8, endereco=$9, carro=$10, observacoes=$11, etiquetas=$12
        WHERE id=$13 RETURNING *`,
      [data.nome, data.data_nascimento, data.sexo, data.cpf, data.rg, data.nome_mae,
       data.apelido, data.artigo, data.endereco, data.carro, data.observacoes, data.etiquetas, id]
    );
    return rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM suspeitos WHERE id=$1', [id]);
  }
}
