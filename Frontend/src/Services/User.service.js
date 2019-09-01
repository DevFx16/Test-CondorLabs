export function _GetService(Skip, Token) {
    return fetch('/User/' + Skip, {
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

export function _GetNameService(Skip, Token, Name) {
    return fetch('/User/Search/' + Name + '/' + Skip, {
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


export function _LoginService(User) {
    return fetch('/User/Login', {
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