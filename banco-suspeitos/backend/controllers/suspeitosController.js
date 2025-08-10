const Suspeito = require('../models/suspeitoModel');
const Foto = require('../models/fotoModel');

exports.listarTodos = async (req, res) => {
  const suspeitos = await Suspeito.getAll();
  let todos = await Promise.all(suspeitos.map(async s => {
    const lastFoto = await Foto.getLastBySuspeito(s.id);
    return { ...s, foto: lastFoto ? lastFoto.url : null };
  }));
  res.json(todos);
};

exports.visualizarUm = async (req, res) => {
  const s = await Suspeito.getById(req.params.id);
  const fotos = await Foto.getAllBySuspeito(req.params.id);
  res.json({ ...s, fotos });
};

exports.criar = async (req, res) => {
  if (!req.body.nome || !req.body.data_nascimento || !req.body.nome_mae)
    return res.status(400).json({ msg: 'Preencha campos obrigatórios!' });
  const suspeito = await Suspeito.create(req.body);
  res.json(suspeito);
};

exports.editar = async (req, res) => {
  const suspeito = await Suspeito.update(req.params.id, req.body);
  res.json(suspeito);
};

exports.deletar = async (req, res) => {
  await Suspeito.delete(req.params.id);
  res.json({ msg: 'Excluído' });
};
