const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, senha, role } = req.body;
  if (!nome || !email || !senha)
    return res.status(400).json({ msg: 'Dados obrigatórios faltando' });
  try {
    const hashed = await bcrypt.hash(senha, 10);
    const user = await User.create(nome, email, hashed, role || 'leitor');
    res.json({ id: user.id });
  } catch (err) {
    console.error('ERRO NO REGISTER:', err);
    res.status(500).json({ msg: err.message });
  }
};


exports.login = async (req, res) => {console.log(req.body);
  const { email, senha } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !(await bcrypt.compare(senha, user.password))) return res.status(401).json({ msg: 'Login incorreto' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, role: user.role, nome: user.nome });
};