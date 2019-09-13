import { _GetService, _GetOneService, _PostService, _PutService, 
    _GetGroupsConversationsService, _GetOneGroupConversationService, _PutGroupService } 
    from '../Services/Conversation.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

//Get Conversations by id
async function _Get(Token) {
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

//get groups
async function _GetGroups(Token) {
    return new Promise((resolve, reject) => {
        _GetGroupsConversationsService(Token).then(Response => {
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

//get group by id
async function _GetGroupOne(Id, Token) {
    return new Promise((resolve, reject) => {
        _GetOneGroupConversationService(Token, Id).then(Response => {
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

//get one conversation id
async function _GetOne(Token, Id) {
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

//new conversation
async function _Post(Conversation, Token) {
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

//add message
async function _Put(Message, Token, Id) {
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

//add message
async function _PutGroup(Message, Token, Id) {
    return new Promise((resolve, reject) => {
        _PutGroupService(Message, Id, Token).then(Response => {
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
    _GetGroupOne,
    _PutGroup
}