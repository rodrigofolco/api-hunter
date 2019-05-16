const express = require('express');
const router = express.Router();
const bonds = require('./bond.model');
const request = require('../../helpers/request.helper');
const authMiddleware = require('../../../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const bonds = await request('GET', 'http://jurus.com.br/api/v1/bonds');

        // const sleep = (milliseconds) => {
        //     return new Promise(resolve => setTimeout(resolve, milliseconds))
        //   }

        return res.send({ data: bonds.body.bonds });
    } catch (error) {
        return res.status(500).send({ error: 'Error trying to get bonds.' });
    }
})

router.post('/', async (req, res) => {
    try {
        const { owner, bond } = req.body;
        if (!owner) {
            return res.status(400).send({ error: 'Owner field is required.' });
        }

        if (!bond) {
            return res.status(400).send({ error: 'Bond field is required.' })
        }

        const data = await bonds.create(req.body);
        return res.send({ data })
    } catch (error) {

    }

})

module.exports = router;