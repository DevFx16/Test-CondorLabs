const { _Get, _Post, _GetOne, _Delete, _Put } = require('../Controllers/Conversation.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { ConversationMiddleware, MessageMiddleware } = require('../Middleware/Conversation.middleware');

//this routes of conversation model
exports.ConversationRoutes = Router => {
    Router.get('/Conversation', isAuth, _Get);
    Router.get('/Conversation/:Id', isAuth, _GetOne);
    Router.post('/Conversation', isAuth, ConversationMiddleware, _Post);
    Router.put('/Conversation/:Id', isAuth, MessageMiddleware, _Put);
    Router.delete('/Conversation/:Id', isAuth, _Delete);
}