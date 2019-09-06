const { User } = require('../Models/User.model');
const { CreateToken } = require('../Services/Auth.service');
const { Storage } = require('../Config/App.config');
const path = require('path');
exports._Get = (req, res) => {
    User.find().select('-Password')
        .skip(parseInt(req.params.Skip)).limit(50).where('_id').ne(req.headers._id).then((user) => {
            return res.status(200).send(user !== null ? user : {});
        }).catch((err) => {
            return res.status(406).send(err);
        });
}

exports._GetId = (req, res) => {
    User.findById(req.headers._id).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._GetName = (req, res) => {
    User.find({ 'DisplayName': { '$regex': new RegExp(req.params.Name.toUpperCase()) } }).skip(parseInt(req.params.Skip)).select('-Password')
        .where('_id').ne(req.headers._id).limit(50).then(user => {
            return res.status(200).send(user !== null ? user : {});
        }).catch(err => {
            return res.status(406).send(err);
        });
}

exports._Post = (req, res) => {
    new User(req.body).save().then(user => {
        return res.status(200).send({
            User: user.toJSON(),
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._UploadImage = (req, res) => {
    Storage(req.headers._id)(req, res, err => {
        if (err) return res.status(406).send(err);
        else {
            User.findByIdAndUpdate(req.headers._id, { 'UrlImage': '/Images/' + req.file.filename }, { new: true }).then(user => {
                return res.status(200).send(user !== null ? user : {});
            }).catch(err => {
                return res.status(406).send(err);
            });
        }
    });
}

exports._Put = (req, res) => {
    User.findByIdAndUpdate(req.headers._id, req.body, { new: true }).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Delete = (req, res) => {
    User.findByIdAndDelete(req.headers._id).then(user => {
        return res.status(200).send(user !== null ? user : {});
    }).catch(err => {
        return res.status(406).send(err);
    });
}

exports._Login = (req, res) => {
    User.findOne().where('Username').equals(req.body.Username).where('Password').equals(req.body.Password).then(user => {
        return res.status(200).send({
            User: user.toJSON(),
            Token: CreateToken(user.toJSON())
        });
    }).catch(err => {
        return res.status(406).send(err);
    });
}