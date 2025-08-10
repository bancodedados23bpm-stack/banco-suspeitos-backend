require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/suspeitos', require('./routes/suspeitos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('API ON at port', PORT);
});
