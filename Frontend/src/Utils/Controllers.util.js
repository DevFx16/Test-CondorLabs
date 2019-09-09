export function ResponseUtil(Response) {
    return new Promise((resolve, reject) => {
        if (Response.status === 401 || Response.status === 403) {
            reject({
                title: 'Oops...',
                message: 'Expired session',
            });
        } else if (Response.status === 200) {
            Response.json().then(body => {
                resolve(body);
            }).catch(err => {
                reject(err);
            });
        } else if (Response.status === 406) {
            reject({
                title: 'Oops...',
                message: 'Model is invlaid',
            });
        } else {
            reject(customError);
        }
    });
}

export const customError = {
    title: 'Oops...',
    message: 'Something went wrong!',
};