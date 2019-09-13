/**
 * Routing api conversation
 */
const { _Get, _Post, _GetOne, _Delete, _Put, 
    _GetGroups, _GetOneGroup, _PutGroup } = require('../Controllers/Conversation.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { ConversationMiddleware, MessageMiddleware } = require('../Middleware/Conversation.middleware');

//this routes of conversation model
exports.ConversationRoutes = Router => {
    Router.get('/Conversation', isAuth, _Get);
    Router.get('/Conversation/:Id', isAuth, _GetOne);
    Router.get('/Conversation/Groups/All', isAuth, _GetGroups);
    Router.get('/Conversation/Groups/One/:Id', isAuth, _GetOneGroup);
    Router.post('/Conversation', isAuth, ConversationMiddleware, _Post);
    Router.put('/Conversation/:Id', isAuth, MessageMiddleware, _Put);
    Router.put('/Conversation/Groups/:Id', isAuth, MessageMiddleware, _PutGroup);
    Router.delete('/Conversation/:Id', isAuth, _Delete);
}