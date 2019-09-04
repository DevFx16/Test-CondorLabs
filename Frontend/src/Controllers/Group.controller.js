import { _GetService } from '../Services/Group.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

export function _Get(Token) {
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

export default {
    _Get
}