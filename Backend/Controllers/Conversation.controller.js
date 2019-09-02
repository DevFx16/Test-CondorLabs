const { Conversation } = require('../Models/Conversation.model');

exports._Get = (req, res) => {
    Conversation.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', select: '-Password' }).then(conversation => {
            return res.status(200).send(conversation);
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._GetOne = (req, res) => {
    Conversation.findOne().where('Members').all([req.headers._id, req.params.Id])
        .populate({ path: 'Members', select: '-Password' }).then(conversation => {
            return res.status(200).send(conversation !== null ? conversation : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}


exports._Post = (req, res) => {
    new Conversation(req.body).save().then(conversation => {
        conversation.populate({ path: 'Members', select: '-Password' }, function (err) {
            return res.status(200).send(conversation);
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Put = (req, res) => {
    Conversation.findByIdAndUpdate(req.params.Id, { '$push': { 'Messages': req.body } }, { new: true }).then(conversation => {
        return res.status(200).send(conversation);
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = (req, res) => {
    Conversation.findOneAndDelete(req.params.Id).then(conversation => {
        return res.status(200).send(conversation);
    }).catch(err => {
        return res.status(406).send(err);
    });
}