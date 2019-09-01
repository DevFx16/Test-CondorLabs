import Io from 'socket.io-client';
import { _Put } from './User.controller';
export default () => {
    const Socket = Io();
    Socket.on('connect', () => {
        const { User, Token } = JSON.parse(localStorage.getItem('User'));
        _Put(Token, { Status: true });
        window.onbeforeunload = function () {
            _Put(Token, { Status: false });
        };
    });
}