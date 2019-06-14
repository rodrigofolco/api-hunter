const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.send({ error: 'Token não enviado.' })
    }

    jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
        if (err) {
            return res.status(400).send({ error: 'Token inválido.' });
        }
        return next();

    })
}

module.exports = auth;