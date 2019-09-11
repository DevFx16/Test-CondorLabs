const { Group } = require('../Models/Groups.model');
const { ConversationGroup } = require('../Models/Conversation.model');

exports._Get = async (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } }).then(groups => {
            return res.status(200).send(groups !== null ? groups : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._Post = async (req, res) => {
    new Group(req.body).save().then(group => {
        if (group !== null) {
            new ConversationGroup({ Group: group._id }).save().then(con => {
                con.populate('Group', (err, doc) => {
                    if (err) return res.status(400).send(err !== null ? err : {});
                    return res.status(200).send(doc !== null ? doc : {});
                });
            });
        }
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Put = async (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { 'Members': { '$push': { '$each': req.body.Members } } }, { new: true }).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = async (req, res) => {
    Group.findByIdAndDelete(req.params.Id).then(group => {
        ConversationGroup.remove({ 'Group': group._id });
        return res.status(200).send(group !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._DeleteMember = async (req, res) => {
    Group.findByIdAndDelete(req.params.Id, { '$pull': { 'Members': { '$elemMatch': req.body.Member } } }).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}