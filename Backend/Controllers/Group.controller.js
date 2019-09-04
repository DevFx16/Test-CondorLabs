const { Group } = require('../Models/Groups.model');

exports._Get = (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } }).then(groups => {
            return res.status(200).send(groups !== null ? groups : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._Post = (req, res) => {
    new Group(req.body).save().then(group => {
        return res.status(200).send(groups !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Put = (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': req.body } }, { new: true }).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = (req, res) => {
    Group.findByIdAndDelete(req.params.Id).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}