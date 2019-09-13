const { _Get, _Post, _Put, _Delete, _DeleteMember, _UploadImage } = require('../Controllers/Group.controller');
const { isAuth } = require('../Middleware/Auth.middleware');
const { GroupMiddleware } = require('../Middleware/Group.middleware');

//this routes of grou`p model
exports.GroupRoutes = Router => {
    Router.get('/Group', isAuth, _Get);
    Router.post('/Group', isAuth, GroupMiddleware, _Post);
    Router.put('/Group/:Id', isAuth, _Put);
    Router.put('/Group/Upload/:Id', isAuth, _UploadImage);
    Router.delete('/Group/:Id', isAuth, _Delete);
    Router.delete('/Group/Member/:Id', isAuth, _DeleteMember);
}