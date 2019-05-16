const express = require('express');
const router = express.Router();
const users = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const user = await user.find({});
        return res.send(users);
    } catch (err) {
        return res.send({ error: 'Error trying to get users.' });
    }
})

router.post('/', async (req, res) => {
    const { email, password, name, type } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Email field is required.' })
    }
    if (!password) {
        return res.status(400).send({ error: 'Password field is required.' })
    }
    if (!name) {
        return res.status(400).send({ error: 'Name field is required.' })
    }
    if (!type) {
        return res.status(400).send({ error: 'Type field is required.' })
    }

    try {
        if (await users.findOne({ email })) {
            return res.status(400).send({ error: 'User already registered.' })
        }

        const user = await users.create(req.body);
        user.password = null;
        return res.send({ user, token: createUserToken(user._id) });

    } catch (err) {
        return res.status(500).send({ error: 'Error trying to get user.' });
    }

})

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: '' });
    try {
        const user = await users.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).send({ error: 'User not found.' })
        }

        const pass_ok = await bcrypt.compare(password.toString(), user.password);

        if (!pass_ok) {
            return res.status(401).send({ error: 'Invalid password.' })
        }
        user.password = null;
        return res.send({ user, token: createUserToken(user._id) })

    } catch (err) {
        return res.send({ error: 'Error trying to authenticate user.' });
    }
});

const createUserToken = userId => {
    return jwt.sign({ id: userId }, process.env.JWT_PASS, { expiresIn: '7d' });
}

module.exports = router;