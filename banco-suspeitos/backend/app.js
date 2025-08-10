require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ROTAS PRINCIPAIS (EXEMPLO)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/suspeitos', require('./routes/suspeitos'));

// ROTA DE BOAS-VINDAS NA RAIZ "/"
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API do Banco de Suspeitos!',
    status: 'online',
    exemplos: [
      { rota: '/api/auth', metodo: 'POST', descricao: 'Autentica um usuário.' },
      { rota: '/api/suspeitos', metodo: 'GET', descricao: 'Lista todos os suspeitos.' }
    ],
    doc: 'Veja as rotas detalhadas no README ou documentação futura.'
  });
});

// LIGA O SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('API ON at port', PORT);
});
