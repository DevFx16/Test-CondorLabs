import { _GetService, _PostService } from '../Services/Group.service';
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

function _Post(Token, Group) {
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

export default {
    _Get,
    _Post
}