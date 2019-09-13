/**
 * Schema moongose User
 */
//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

//define schemaS
const UserSchema = new schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    DisplayName: { type: String, required: true },
    UrlImage: { type: String, default: 'https://image.flaticon.com/icons/svg/660/660611.svg' },
    Status: { type: Boolean, default: true },
    CreateAt: { type: Date, default: Date.now }
});

//Export model
exports.User = Moongoose.model('User', UserSchema);