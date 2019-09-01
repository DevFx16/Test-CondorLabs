//Imports modules
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;


//define schemaS
const GroupSchema = new schema({
    DisplayName: { type: String, required: true },
    UrlImage: { type: String, default: 'https://image.flaticon.com/icons/svg/1256/1256661.svg' },
    CreateAt: { type: Date, default: Date.now },
    Members: { type: [{ type: schema.Types.ObjectId, unique: true, ref: 'User' }] }
});

//Export model
exports.Group = Moongoose.model('Group', GroupSchema);