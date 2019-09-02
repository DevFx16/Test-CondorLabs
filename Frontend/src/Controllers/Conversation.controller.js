import { _GetService, _GetOneService, _PostService } from '../Services/Conversation.service';

export function _Get(Token) {
    return new Promise((resolve, reject) => {
        _GetService(Token).then(Response => {
            if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
                });
            } else if (Response.status === 200) {
                Response.json().then(conversations => {
                    resolve(conversations);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong in conversations!',
                }
            );
        });
    });
}

export function _GetOne(Token, Id) {
    return new Promise((resolve, reject) => {
        _GetOneService(Token, Id).then(Response => {
            if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
                });
            } else if (Response.status === 200) {
                Response.json().then(conversation => {
                    resolve(conversation);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong in conversations!',
                }
            );
        });
    });
}

export function _Post(Conversation, Token) {
    return new Promise((resolve, reject) => {
        _PostService(Conversation, Token).then(Response => {
            if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
                });
            } else if (Response.status === 200) {
                Response.json().then(conversation => {
                    resolve(conversation);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong in conversations!',
                }
            );
        });
    });
}


export default {
    _Get,
    _GetOne,
    _Post
}