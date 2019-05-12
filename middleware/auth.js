const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.auth;
    if (!token) {
        return res.send({ error: 'Token não enviado.' })
    }

    jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
        if (err) {
            console.log('err :', err);
            return res.send({ error: 'Token inválido.' });
        }
        return next();

    })
}

module.exports = auth;