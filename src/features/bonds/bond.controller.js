const express = require('express');
const router = express.Router();
const bonds = require('./bond.model');
const request = require('../../helpers/request.helper');
const authMiddleware = require('../../../middleware/auth');
const { ObjectId } = require('mongodb');
 
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        console.log('query :', query);
        let userBonds;
        let { body } = await request('GET', 'http://jurus.com.br/api/v1/bonds');
        // console.log('body :', body);

        if (query.owner) {
            console.log('oie');
            userBonds = (await bonds.find({ owner: ObjectId(query.owner) })).map(bond => bond._id.toString());
            console.log('userBonds :', userBonds);
            console.log('body.bonds :', body.bonds.length);
            body.bonds = body.bonds.filter(bond => userBonds.includes(bond._id.toString));
        }
        console.log('body.bonds :', body.bonds);
        return res.send({ data: body.bonds });
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
        return res.status(500).send({ error: 'Error trying to create bond.' });
    }

})

module.exports = router;