export function _GetService(Token) {
    return fetch('/Conversation', {
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

export function _GetOneService(Token, Id) {
    return fetch('/Conversation/' + Id, {
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

export function _PostService(Conversation, Token) {
    return fetch('/Conversation', {
        method: 'POST',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
        body: JSON.stringify(Conversation)
    });
};

export function _PutService(Message, Id, Token) {
    return fetch('/Conversation/' + Id, {
        method: 'PUT',
        headers: new Headers(
            {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
                'authorization': 'Bearer ' + Token
            }
        ),
        mode: 'cors',
        body: JSON.stringify(Message)
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