const Auth = require('../Services/Auth.service');

exports.isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' })
    }

    const token = req.headers.authorization.split(' ')[1]

    Auth.decodeToken(token)
        .then(response => {
            req.headers._id = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        });
}