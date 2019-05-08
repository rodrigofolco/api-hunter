const express = require('express');
const router = express.Router();
const users = require('./user.model');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    users.find({}, (err, data) => {
        if (err) return res.send({ error: 'Error trying to get users.' });
        return res.send(data);
    })
})

router.post('/', (req, res) => {
    const { email, password, name, type } = req.body;

    if (!email) {
        return res.send({ error: 'The email field was not sent.' })
    }
    if (!password) {
        return res.send({ error: 'The password field was not sent.' })
    }
    if (!name) {
        return res.send({ error: 'The name field was not sent.' })
    }
    if (!type) {
        return res.send({ error: 'The type field was not sent.' })
    }

    users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: 'Error trying to get user.' });
        if (data) return res.send({ error: 'User already registered.' });

        users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Error trying to create user' });

            data.password = null;
            return res.send(data);
        })
    })

})

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: ''});

    users.findOne({email}, (err, data) => {
        if (err) return res.send({error: 'Error trying to get user.'});
        if (!data) return res.send({error: 'User not registered'});

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.send({error: 'Error trying to authenticating the user.'});
            return res.send(data);
        })
    }).select('+password')
});

module.exports = router;