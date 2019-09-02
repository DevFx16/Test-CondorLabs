const { Joi, celebrate } = require('celebrate');

//Celebrate validation body
exports.ConversationMiddleware = celebrate(
    {
        body: Joi.object().keys({
            Members: Joi.array().items(Joi.string().required()),
        }).unknown()
    }
);
//Celebrate validation body
exports.MessageMiddleware = celebrate(
    {
        body: Joi.object().keys({
            Message: Joi.string().required(),
            IndexUser: Joi.number().integer().required()
        }).unknown()
    }
);