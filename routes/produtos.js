const express = require('express');
const router = express.Router();
const db = require('../data/supabase');

router.get('/erro-teste', (req, res) => {
    throw new Error('Teste de Erro :(')
});

router.get('/', async (req, res) => {
    const categoriaId = req.query.categoriaId;
    if (categoriaId) {
        const { data, error } = await db.from('produtos').select('*').eq('categoriaId', categoriaId);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.json(data);
    }
    const { data, error } = await db.from('produtos').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

router.post('/', async (req, res) => {
    const { data, error } = await db.from('produtos').insert([
        {
            categoriaId: req.body.categoriaId,
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            imagem: req.body.imagem
        }
    ]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
});

router.put('/:id', async (req, res) => {
    const produtoID = parseInt(req.params.id);
    const { data, error } = await db.from('produtos').update(req.body).eq('id', produtoID);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
    const produtoID = parseInt(req.params.id);
    const { data, error } = await db.from('produtos').delete().eq('id', produtoID);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'Produto deletado com sucesso' });
});

module.exports = router;