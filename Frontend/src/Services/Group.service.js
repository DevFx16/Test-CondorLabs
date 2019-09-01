export function _GetService(Token) {
    return fetch('/Group', {
        method: 'GET',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors'
    });
}

export function _PostService(User) {
    return fetch('/User', {
        method: 'POST',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
            }
        ),
        mode: 'cors',
        body: JSON.stringify(User)
    });
};

export function _PutService(User, Token) {
    return fetch('/User', {
        method: 'PUT',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
        body: JSON.stringify(User)
    });
};

export function _DeleteService(Token) {
    return fetch('/User', {
        method: 'DELETE',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
    });
};