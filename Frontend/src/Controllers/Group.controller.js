import { _GetService } from '../Services/Group.service';

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
                Response.json().then(groups => {
                    resolve(groups);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong in groups!',
                }
            );
        });
    });
}

export default {
    _Get
}