import { _GetService, _LoginService, _PostService, _DeleteService, _GetNameService } from '../Services/User.service';

export function _Get(Skip, Token) {
    return new Promise((resolve, reject) => {
        _GetService(Skip, Token).then(Response => {
            if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
                });
            }else if(Response.status === 200) {
                Response.json().then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
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

export function _GetName(Skip, Token, Name) {
    return new Promise((resolve, reject) => {
        _GetNameService(Skip, Token, Name).then(Response => {
            if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
                });
            }else if(Response.status === 200) {
                Response.json().then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            }else{
                console.log(Response);
                reject( {
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
        _Delete(Token).then(Response => {
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
            } else if (Response.status === 401 || Response.status === 403) {
                reject({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Expired session',
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