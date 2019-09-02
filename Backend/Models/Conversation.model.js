const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const Messages = new schema({
    IndexUser: { type: Number, required: true },
    Message: { type: String, required: true }
});

//Schema conversation 
const ConversationSchema = new schema({
    Messages: { type: [Messages], default: [] },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true }
});

//Schema conversation group
const ConversationGroupSchema = new schema({
    Messages: { type: [Messages], default: [] },
    Group: { type: schema.Types.ObjectId, unique: true, ref: 'Group' }
});


//Export model
exports.Conversation = Moongoose.model('Conversation', ConversationSchema);

//Export model
exports.ConversationGroup = Moongoose.model('ConversationGroup', ConversationGroupSchema);