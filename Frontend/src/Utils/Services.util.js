export function _get(Route, Token) {
    return fetch(Route, {
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

export function _post(Route, Token, Body) {
    return fetch(Route, {
        method: 'POST',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
        body: JSON.stringify(Body)
    });
}

export function _put(Route, Token, Body) {
    return fetch(Route, {
        method: 'PUT',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
        body: JSON.stringify(Body)
    });
}

export function _delete(Route, Token) {
    return fetch(Route, {
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
}

export function _image(Image, Token, Route) {
    var data = new FormData();
    data.append('image', Image);
    return fetch(Route, {
        method: 'PUT',
        headers: new Headers({
            'authorization': 'Bearer ' + Token,
        }),
        mode: 'cors',
        body: data
    });
}