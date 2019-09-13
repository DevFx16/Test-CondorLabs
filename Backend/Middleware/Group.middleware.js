/**
 * validation model group
 */
const { Joi, celebrate } = require('celebrate');

//Celebrate validation body
exports.GroupMiddleware = celebrate(
    {
        body: Joi.object().keys({
            Members: Joi.array().items(Joi.string().required()),
            DisplayName: Joi.string().min(4).max(30).required()
        }).unknown()
    }
);
