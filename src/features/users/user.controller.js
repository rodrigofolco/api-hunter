const express = require('express');
const router = express.Router();


router.get('/:id', async (req, res) => {
    return res.send({message: data});
})

router.post('/', (req, res) => {
    console.log('req :', req.body);
    const { usuario } = req.body;
    if (!usuario) {
        return res.send({message: "Voce deve mandar um usaurio"})
    }
    return res.send({message: 'sucesso'})
})

module.exports = router;