const { Joi, celebrate } = require('celebrate');

//Celebrate validation body
exports.UserMiddleware = celebrate(
    {
        body: Joi.object().keys({
            Username: Joi.string().required().min(4).max(15),
            Password: Joi.string().required().min(4).max(30),
            DisplayName: Joi.string().required().min(4).max(30)
        }).unknown()
    }
);

exports.UserMiddlewareLogin = celebrate(
    {
        body: Joi.object().keys({
            Username: Joi.string().required().min(4).max(15),
            Password: Joi.string().required().min(4).max(30),
        }).unknown()
    }
);