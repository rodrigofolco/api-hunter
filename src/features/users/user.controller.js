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
        return res.send({ error: 'Erro ao buscar usuários.' });
    }
})

router.post('/', async (req, res) => {
    const { email, password, name, type } = req.body;

    if (!email) {
        return res.send({ error: 'O campo email não foi enviado.' })
    }
    if (!password) {
        return res.send({ error: 'O campo password não foi enviado.' })
    }
    if (!name) {
        return res.send({ error: 'O campo name não foi enviado.' })
    }
    if (!type) {
        return res.send({ error: 'O campo tipo não foi enviado..' })
    }

    try {
        if (await users.findOne({ email })) {
            return res.send({ error: 'Usuário já registrado.' })
        }

        const user = await users.create(req.body);
        user.password = null;
        return res.send({ user, token: createUserToken(user._id) });

    } catch (err) {
        return res.send({ error: 'Erro ao buscar usuário' });
    }

})

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: '' });
    try {
        const user = await users.findOne({ email }).select('+password');
        if (!user) {
            return res.send({ error: 'Usuário não registrado.' })
        }

        const pass_ok = await bcrypt.compare(password.toString(), user.password);

        if (!pass_ok) {
            return res.send({ error: 'Erro ao autenticar usuário.' })
        }
        user.password = null;
        return res.send({ user, token: createUserToken(user._id) })

    } catch (err) {
        console.log('err :', err);
        return res.send({ error: 'Erro ao buscar usuário' });
    }
});

const createUserToken = userId => {
    return jwt.sign({ id: userId }, process.env.JWT_PASS, { expiresIn: '7d' });
}

module.exports = router;