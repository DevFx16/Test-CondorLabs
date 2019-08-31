import { _GetService, _LoginService, _PostService, _DeleteService } from '../Services/User.service';

export function _Get(Skip, Token) {
    return new Promise((resolve, reject) => {
        _GetService(Skip, Token).then(Response => {
            
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                }
            );
        });
    });
};

export function _Post(User) {
    return new Promise((resolve, reject) => {
        _PostService(User).then(Response => {
            if (Response.status === 406) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Model is invlaid',
                });
            } else if (Response.status === 200) {
                Response.json().then(user => {
                    localStorage.setItem('User', JSON.stringify(user));
                    resolve('Ok');
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                }
            );
        });
    });
};


export function _Login(User) {
    return new Promise((resolve, reject) => {
        _LoginService(User).then(Response => {
            if (Response.status === 406) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Username is duplicated',
                });
            } else if (Response.status === 200) {
                Response.json().then(user => {
                    localStorage.setItem('User', JSON.stringify(user));
                    resolve('Ok');
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                }
            );
        });
    });
};

export function _Delete(Token) {
    return new Promise((resolve, reject) => {
        _PostService(User).then(Response => {
            if (Response.status === 406) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Model is invlaid',
                });
            } else if (Response.status === 200) {
                Response.json().then(user => {
                    localStorage.removeItem('User');
                    resolve('Ok');
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }).catch(err => {
            reject(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                }
            );
        });
    });
}