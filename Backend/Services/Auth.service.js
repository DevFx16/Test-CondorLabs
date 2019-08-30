const JWT = require('jsonwebtoken');
const Moment = require('moment');
const { Config } = require('../Config/App.config');

//Function to create the authentication token
exports.CreateToken = User => {
    //token payload
    const payload = {
        sub: user._id,
        iat: Moment().unix(),
        exp: Moment().add(15, 'days').unix()
    }

    //return token
    return JWT.sign(payload, Config.Token);
};

//token decoding function
exports.Decode = token => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, Config.Token)
            //valid if it has not expired
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Session expired re-enter'
                });
            }
            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });
    return decoded
};