import { _GetService, _PostService, _PutImage } from '../Services/Group.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

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

async function _Post(Token, Group) {
    return new Promise((resolve, reject) => {
        _PostService(Group, Token).then(Response => {
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

async function _PutUpload(Token, Image, Id) {
    return new Promise((resolve, reject) => {
        _PutImage(Image, Token, Id).then(Response => {
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

export default {
    _Get,
    _Post,
    _PutUpload
}