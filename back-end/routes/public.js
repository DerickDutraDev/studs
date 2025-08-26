const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário com este e-mail já existe.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: 'Usuário cadastrado com sucesso!', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'E-mail ou senha incorretos.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'E-mail ou senha incorretos.' });
    }

    const token = jwt.sign({ id: user.id }, 'sua_chave_secreta', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;