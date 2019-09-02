const { _Get, _Post, _GetOne, _Delete } = require('../Controllers/Conversation.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { ConversationMiddleware } = require('../Middleware/Conversation.middleware');

//this routes of conversation model
exports.ConversationRoutes = Router => {
    Router.get('/Conversation', isAuth, _Get);
    Router.get('/Conversation/:Id', isAuth, _GetOne);
    Router.post('/Conversation', isAuth, ConversationMiddleware, _Post);
    Router.delete('/Conversation/:Id', isAuth, _Delete);
}