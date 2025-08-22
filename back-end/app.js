const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Banco de dados sincronizado!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });