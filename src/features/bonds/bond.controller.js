const express = require('express');
const router = express.Router();
const request = require('../../helpers/request.helper');


router.get('/', async (req, res) => {
    try {
        const bonds = await request('GET', 'http://jurus.com.br/api/v1/bonds');
        return res.send({ data: bonds });
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