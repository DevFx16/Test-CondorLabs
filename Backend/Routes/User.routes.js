const { _Get, _Delete, _GetId, _Post, _Put, _Login, _GetName, _UploadImage } = require('../Controllers/User.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { UserMiddleware, UserMiddlewareLogin } = require('../Middleware/User.middleware');
//this routes of user model
exports.UserRoutes = Router => {
    Router.get('/User/:Skip', isAuth, _Get);
    Router.get('/User', isAuth, _GetId);
    Router.get('/User/Search/:Name/:Skip', isAuth, _GetName);
    Router.post('/User', UserMiddleware, _Post);
    Router.post('/User/Login', UserMiddlewareLogin, _Login);
    Router.put('/User/Upload', isAuth, _UploadImage);
    Router.put('/User', isAuth, _Put);
    Router.delete('/User', isAuth, _Delete);
};