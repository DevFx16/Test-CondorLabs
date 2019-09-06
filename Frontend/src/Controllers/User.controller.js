import { _GetService, _LoginService, _PostService, _DeleteService, _GetNameService, _PutService, _PutImage, _GetIdService } from '../Services/User.service';
import { ResponseUtil, customError } from '../Utils/Controllers.util';

export function _Get(Skip, Token) {
    return new Promise((resolve, reject) => {
        _GetService(Skip, Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
};

export function _GetId(Token) {
    return new Promise((resolve, reject) => {
        _GetIdService(Token).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
};


export function _GetName(Skip, Token, Name) {
    return new Promise((resolve, reject) => {
        _GetNameService(Skip, Token, Name).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
};

export function _Post(User) {
    return new Promise((resolve, reject) => {
        _PostService(User).then(Response => {
            ResponseUtil(Response).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(customError);
        });
    });
};

export function _Login(User) {
    return new Promise((resolve, reject) => {
        _LoginService(User).then(Response => {
            if (Response.status === 406) {
                reject({
                    title: 'Oops...',
                    message: 'Username or password is invalid',
                });
            } else {
                ResponseUtil(Response).then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(customError);
        });
    });
};

export function _Delete(Token) {
    return new Promise((resolve, reject) => {
        _Delete(Token).then(Response => {
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

export function _Put(Token, User) {
    return new Promise((resolve, reject) => {
        _PutService(User, Token).then(Response => {
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

export function _PutUpload(Token, Image) {
    return new Promise((resolve, reject) => {
        _PutImage(Image, Token).then(Response => {
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