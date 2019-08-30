const { User } = require('../Models/User.model');

exports._Get = (req, res) => {
    User.find({}).skip(req.params.Skip).limit(50).then((user) => {

    }).catch((err) => {

    });
}

exports._GetId = (req, res) => {

}

exports._Post = (req, res) => {

}

exports._Put = (req, res) => {

}

exports._Delete = (req, res) => {

}