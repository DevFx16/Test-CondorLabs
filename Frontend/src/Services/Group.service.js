import { _delete, _get, _post, _put } from '../Utils/Services.util';

export function _GetService(Token) { return _get('/Group', Token); }

export function _PostService(Group, Token) { return _post('/Group', Token, Group); }

export function _PutService(Group, Token, Id) { return _put('/Group/' + Id, Token, Group); }

export function _DeleteService(Token, Id) { return _delete('/Group/' + Id, Token); }