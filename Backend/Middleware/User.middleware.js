const { Joi, celebrate } = require('celebrate');

//Celebrate validation body
exports.UserMiddleware = celebrate(
    {
        body: Joi.object().keys({
            Username: Joi.string().min(4).max(15).required(),
            Password: Joi.string().min(4).max(30).required(),
            DisplayName: Joi.string().min(4).max(30).required()
        }).unknown()
    }
);

//Celebrate validation Login
exports.UserMiddlewareLogin = celebrate(
    {
        body: Joi.object().keys({
            Username: Joi.string().min(4).max(15).required(),
            Password: Joi.string().min(4).max(30).required(),
        }).unknown()
    }
);