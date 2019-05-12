const express = require('express');
const router = express.Router();
const request = require('../../helpers/request.helper');
const authMiddleware = require('../../../middleware/auth');

router.get('/', async (req, res) => {
    try {
        let bonds = await request('GET', 'http://jurus.com.br/api/v1/bonds');

        const { limit } = req.query;
        if (limit) {
            bonds = bonds.slice(0, limit);  
        }

        return res.send({ data: bonds.body });
    } catch (error) {
        return res.send({ error })
    }
})

router.post('/', (req, res) => {
    const { usuario } = req.body;
    if (!usuario) {
        return res.send({ message: "Voce deve mandar um usaurio" })
    }
    return res.send({ message: 'sucesso' })
})

module.exports = router;