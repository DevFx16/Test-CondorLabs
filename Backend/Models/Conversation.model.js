/**
 * Schema moongose Conversations
 */
const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

//Schema new message
const Messages = new schema({
    //user who sent it 
    IndexUser: { type: Number, required: true },
    Message: { type: String, required: true },
    CreateAt: { type: Date, default: Date.now }
});

//Schema conversation 
const ConversationSchema = new schema({
    Messages: { type: [Messages], default: [] },
    Members: { type: [{ type: schema.Types.ObjectId, ref: 'User', required: true }], required: true },
    CreateAt: { type: Date, default: Date.now }
});

//Schema conversation group
const ConversationGroupSchema = new schema({
    Messages: { type: [Messages], default: [] },
    Group: { type: schema.Types.ObjectId, unique: true, ref: 'Group' },
    CreateAt: { type: Date, default: Date.now }
});


//Export model
exports.Conversation = Moongoose.model('Conversation', ConversationSchema);

//Export model
exports.ConversationGroup = Moongoose.model('ConversationGroup', ConversationGroupSchema);