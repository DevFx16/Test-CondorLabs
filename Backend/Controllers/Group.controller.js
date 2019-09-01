const { Group } = require('../Models/Groups.model');

exports._Get = (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } }).then(groups => {
            return res.status(200).send(groups);
        }).catch(err => {
            return res.status(406).send(err);
        }); 
}

exports._Post = (req, res) => {
    new Group(req.body).save().then(group => {
        return res.status(200).send(group);
    }).catch(err => {
        return res.status(406).send(err);
    });
}