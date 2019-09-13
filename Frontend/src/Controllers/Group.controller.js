import { _GetService, _PostService, _PutImage, _PutService } from '../Services/Group.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

//get group
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

//new group
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

//upload image group
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

//add member in group
async function _Put(Id, Member, Token) {
    return new Promise((resolve, reject) => {
        _PutService({ 'Members': [Member] }, Token, Id).then(Response => {
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
    _PutUpload,
    _Put
}