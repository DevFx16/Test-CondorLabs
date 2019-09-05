import { _GetService, _GetOneService, _PostService, _PutService, _GetGroupsConversationsServices } from '../Services/Conversation.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

function _Get(Token) {
    return new Promise((resolve, reject) => {
        _GetService(Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
}

function _GetGroups(Token) {
    return new Promise((resolve, reject) => {
        _GetGroupsConversationsServices(Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
}

function _GetOne(Token, Id) {
    return new Promise((resolve, reject) => {
        _GetOneService(Token, Id).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
}

function _Post(Conversation, Token) {
    return new Promise((resolve, reject) => {
        _PostService(Conversation, Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
}

function _Put(Message, Token, Id) {
    return new Promise((resolve, reject) => {
        _PutService(Message, Id, Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

export default {
    _Get,
    _GetOne,
    _Post,
    _Put,
    _GetGroups,
}