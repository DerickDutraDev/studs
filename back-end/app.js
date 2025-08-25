const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, User } = require('./models');
const publicRoutes = require('./routes/public.js');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


app.use(express.static(path.resolve(__dirname, '..', 'front-end')));

// API
app.use('/api', publicRoutes);

// Rotas para cada arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'html', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'html', 'contato.html'));
});

app.get('/sobre', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'html', 'sobre.html'));
});

app.get('/studs', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'html', 'homePage.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'html', 'cadastro.html'));
});

//servidor
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
