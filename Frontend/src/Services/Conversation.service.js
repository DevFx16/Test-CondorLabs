import { _delete, _get, _post, _put } from '../Utils/Services.util';

export function _GetService(Token) { return _get('/Conversation', Token); }

export function _GetOneService(Token, Id) { return _get('/Conversation/' + Id, Token); }

export function _GetOneRoomService(Token, Id) { return _get('/Conversation/Room/' + Id, Token); }

export function _PostService(Conversation, Token) { return _post('/Conversation', Token, Conversation); }

export function _PutService(Message, Id, Token) { return _put('/Conversation/' + Id, Token, Message); }

export function _DeleteService(Token, Id) { return _delete('/Conversation/' + Id, Token); }