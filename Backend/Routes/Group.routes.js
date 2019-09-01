const { _Get, _Post } = require('../Controllers/Group.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { GroupMiddleware } = require('../Middleware/Group.middleware');

//this routes of grou`p model
exports.GroupRoutes = Router => {
    Router.get('/Group', isAuth, _Get);
    Router.post('/Group', isAuth, GroupMiddleware, _Post);
}