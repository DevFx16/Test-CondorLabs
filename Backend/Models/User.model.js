//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;


//define schemaS
const UserSchema = new schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    DisplayName: { type: String, required: true },
    CreateAt: { type: Date, default: Date.now }
});

//Export model
exports.User = Moongoose.model('User', UserSchema);