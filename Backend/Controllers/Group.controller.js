/**
 * File Controller Conversatios
 */
const { Group } = require('../Models/Groups.model');
const { ConversationGroup } = require('../Models/Conversation.model');
const { Storage, Cloudinaryv2 } = require('../Config/App.config');
const path = require('path');

/**
 * get groups by user
 */
exports._Get = async (req, res) => {
    Group.find().where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } }).then(groups => {
            return res.status(200).send(groups !== null ? groups : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * save new group
 */
exports._Post = async (req, res) => {
    new Group(req.body).save().then(group => {
        if (group !== null) {
            new ConversationGroup({ Group: group._id }).save().then(con => {
                //get group in conversation
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

/**
 * Add member in group
 */
exports._Put = async (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$push': { 'Members': { '$each': req.body.Members } } }, { new: true })
        .where('Members').in([req.headers._id])
        .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } }).then(message => {
            return res.status(200).send(message !== null ? message : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

/**
 * delete group
 */
exports._Delete = async (req, res) => {
    Group.findByIdAndDelete(req.params.Id).then(group => {
        ConversationGroup.deleteOne({ 'Group': group._id }).then(res => { }).catch(err => { });
        return res.status(200).send(group !== null ? group : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * delete member in group
 */
exports._DeleteMember = async (req, res) => {
    Group.findByIdAndUpdate(req.params.Id, { '$pull': { 'Members': req.body.Member } }).then(message => {
        return res.status(200).send(message !== null ? message : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

/**
 * update image group
 */
exports._UploadImage = async (req, res) => {
    //validate storage image
    Storage(req.params.Id)(req, res, err => {
        if (err) return res.status(406).send(err);
        else {
            //upload image in cloudinary
            Cloudinaryv2.uploader.upload(req.file.path, { public_id: path.parse(req.file.filename).name }, 
            function (err, image) {
                if (err) return res.status(406).send(err);
                //delete image in storage
                require('fs').unlinkSync(req.file.path);
                //update UrlImage in group
                Group.findByIdAndUpdate(req.params.Id, { 'UrlImage': image.secure_url }, { new: true })
                    .where('Members').in([req.headers._id])
                    .populate({ path: 'Members', populate: { path: 'Members', select: '-Password' } })
                    .then(user => {
                        return res.status(200).send(user !== null ? user : {});
                    }).catch(err => {
                        return res.status(406).send(err);
                    });
            });
        }
    });
}