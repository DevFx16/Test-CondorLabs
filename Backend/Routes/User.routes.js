const { _Get, _Delete, _GetId, _Post, _Put } = require('../Controllers/User.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { UserMiddleware } = require('../Middleware/User.middleware');

//this routes of user model
exports.UserRoutes = app => {
    app.get('/User/:Skip', isAuth, _Get);
    app.get('/User', isAuth, _GetId);
    app.post('/User', isAuth, UserMiddleware, _Post);
    app.put('/User', isAuth, UserMiddleware, _Put);
    app.delete('/User', isAuth, _Delete);
};