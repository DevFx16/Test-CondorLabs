//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;
const { Joi, celebrate, errors } = require('celebrate');

//define schemaS
const UserSchema = new schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    CreateAt: { type: Date, default: Date.now }
});

//Export model
exports.User = Moongoose.model('User', UserSchema);