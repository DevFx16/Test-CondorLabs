exports._Get = (Skip, Token) => {
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

exports._Post = User => {
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


exports._Login = User => {
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