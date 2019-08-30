const Auth = require('../Services/Auth.service');

exports.isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send();
    }

    const token = req.headers.authorization.split(' ')[1];

    Auth.Decode(token)
        .then(response => {
            req.headers._id = response;
            next();
        })
        .catch(response => {
            return res.status(response.status).send({ Message: response.message });
        });
}