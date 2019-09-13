/**
 * File Cotroller User
 */
const { User } = require('../Models/User.model');
const { Group } = require('../Models/Groups.model');
const { Conversation } = require('../Models/Conversation.model');
const { CreateToken } = require('../Services/Auth.service');
const { Storage, Cloudinaryv2 } = require('../Config/App.config');
const path = require('path');

//get all users
exports._Get = async (req, res) => {
    User.find().select('-Password')
        .skip(parseInt(req.params.Skip)).limit(50).where('_id').ne(req.headers._id).then((user) => {
            return res.status(200).send(user !== null ? user : {});
        }).catch((err) => {
            return res.status(406).send(err);
        });
}

//get user by id
exports._GetId = async (req, res) => {
    User.findById(req.headers._id).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//search user by name
exports._GetName = async (req, res) => {
    User.find({ 'DisplayName': { '$regex': new RegExp(req.params.Name.toUpperCase()) } })
    .skip(parseInt(req.params.Skip)).select('-Password')
        .where('_id').ne(req.headers._id).limit(50).then(user => {
            return res.status(200).send(user !== null ? user : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

//new user
exports._Post = async (req, res) => {
    new User(req.body).save().then(user => {
        return res.status(200).send({
            User: user.toJSON(),
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

//change image
exports._UploadImage = async (req, res) => {
    //validate image with multer
    Storage(req.headers._id)(req, res, err => {
        if (err) return res.status(406).send(err);
        else {
            //upload image in cloudinary
            Cloudinaryv2.uploader.upload(req.file.path, { public_id: path.parse(req.file.filename).name }, 
            function (err, image) {
                if (err) return res.status(406).send(err);
                require('fs').unlinkSync(req.file.path);
                User.findByIdAndUpdate(req.headers._id, { 'UrlImage': image.secure_url }, { new: true }).then(user => {
                    return res.status(200).send(user !== null ? user : {});
                }).catch(err => {
                    return res.status(406).send(err);
                });
            });
        }
    });
}

exports._Put = async (req, res) => {
    User.findByIdAndUpdate(req.headers._id, req.body, { new: true }).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = async (req, res) => {
    User.findByIdAndDelete(req.headers._id).then(user => {
        Cloudinaryv2.api.delete_resources([user._id], (err, result) => { });
        Group.updateMany({ '$pull': { 'Members': user._id } }).then(res => { }).catch(err => { });
        Conversation.deleteMany({ 'Members': { '$in': [user._id] } }).then(res => { }).catch(err => { });
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Login = async (req, res) => {
    User.findOne().where('Username').equals(req.body.Username).where('Password')
    .equals(req.body.Password).then(user => {
        return res.status(200).send({
            User: user.toJSON(),
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}