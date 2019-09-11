const { Conversation, ConversationGroup } = require('../Models/Conversation.model');

exports._Get = async (req, res) => {
    Conversation.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', select: '-Password' })
        .then(conversation => {
            return res.status(200).send(conversation !== null ? conversation : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._GetGroups = async (req, res) => {
    ConversationGroup.find()
        .populate({ path: 'Group', match: { 'Members': { '$in': [req.headers._id] } } }).then(conversation => {
            return res.status(200).send(conversation !== null ? conversation.filter(item => item.Group !== null) : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._GetOneGroup = async (req, res) => {
    ConversationGroup.findOne({ '_id': req.params.Id }).populate({
        path: 'Group', match: { 'Members': { '$in': [req.headers._id] } },
        populate: { path: 'Members', select: '-Password' }
    }).then(conversation => {
        return res.status(200).send(conversation !== null && conversation.Group !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._GetOne = async (req, res) => {
    Conversation.findOne().where('Members').all([req.headers._id, req.params.Id])
        .populate({ path: 'Members', select: '-Password' }).then(conversation => {
            return res.status(200).send(conversation !== null ? conversation : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._Post = async (req, res) => {
    new Conversation(req.body).save().then(conversation => {
        conversation.populate({ path: 'Members', select: '-Password' }, function (err) {
            return res.status(200).send(conversation !== null ? conversation : {});
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Put = async (req, res) => {
    Conversation.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': req.body } }, { new: true }).then(conversation => {
        return res.status(200).send(conversation !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}
exports._PutGroup = async (req, res) => {
    ConversationGroup.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': req.body } }, { new: true }).then(conversation => {
        return res.status(200).send(conversation !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = async (req, res) => {
    Conversation.findByIdAndDelete(req.params.Id).then(conversation => {
        return res.status(200).send(conversation !== null ? conversation : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}