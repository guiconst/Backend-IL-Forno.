const express = require('express');
const router = express.Router();
const db = require('../data/supabase');

router.get('/', async (req, res) => {
    const { data, error } = await db.from('categorias').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

router.post('/', async (req, res) => {
    const { data, error } = await db.from('categorias').insert([
        { nome: req.body.nome }
    ]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
});

module.exports = router;