/**
 * Services and routing for api
 */
import { _delete, _get, _post, _put, _image } from '../Utils/Services.util';

export function _GetService(Skip, Token) { return _get('/User/' + Skip, Token); }

export function _GetIdService(Token) { return _get('/User', Token); }

export function _GetNameService(Skip, Token, Name) { return _get('/User/Search/' + Name + '/' + Skip, Token); }

export function _PostService(User) { return _post('/User', '', User); }

export function _PutService(User, Token) { return _put('/User', Token, User); }

export function _LoginService(User) { return _post('/User/Login', '', User); }

export function _DeleteService(Token) { return _delete('/User', Token); }

export function _PutImage(Image, Token) { return _image(Image, Token, '/User/Upload') }