const express = require('express');
const router = express.Router();
const bonds = require('./bond.model');
const request = require('../../helpers/request.helper');
const authMiddleware = require('../../../middleware/auth');
const { ObjectId } = require('mongodb');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { query } = req;
        let { body } = await request('GET', 'http://jurus.com.br/api/v1/bonds');
        if (query.owner) {
            const userBonds = (await bonds.find({ owner: ObjectId(query.owner), deleted: false }));
            const bondsIds = userBonds.map(bond => bond.bond.toString());
            body.bonds = body.bonds.filter(bond => bondsIds.includes(bond._id));
            body.bonds.forEach(bond => {
                let b = userBonds.find(b => b.bond === bond._id);
                bond.value = b.value || 0;
                bond.ih_id = b._id;
            })
        }
        return res.send({ data: body.bonds });
    } catch (error) {
        return res.status(500).send({ error: 'Error trying to get bonds.' });
    }
})

router.post('/', authMiddleware, async (req, res) => {
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
        return res.status(500).send({ error: 'Error trying to create bond.' });
    }

});

router.put('/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await bonds.updateOne({ _id: ObjectId(id) }, { $set: { value: body.value} });
        return res.send({ data })
    } catch (error) {
        return res.status(500).send({ error: 'Error trying to create bond.' });
    }

})

router.delete('/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        const data = await bonds.delete({ _id: ObjectId(id) });
        return res.send({ data })
    } catch (error) {
        return res.status(500).send({ error: 'Error trying to create bond.' });
    }

})
module.exports = router;