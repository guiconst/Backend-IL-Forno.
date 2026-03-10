const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', async (req, res) => {
    res.json(db.categorias);
});

router.post('/', async (req, res) => {
    const novaCategoria = {
        id: db.categorias.length + 1,
        nome: req.body.nome
    };
    db.categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
});

module.exports = router;

// * URL: http://localhost:8000/api/categorias
// * metodos: GET, POST, PUT, DELETE