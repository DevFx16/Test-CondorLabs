import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import ListConversations from './ListConversations';
import Chat from './Chat';
import ListUsers from './ListUsers';
import izitoast from 'izitoast';
import { _Put, _PutUpload } from '../Controllers/User.controller';
import ConversationController from '../Controllers/Conversation.controller';
import AddGroup from './AddGroup';
import Io from 'socket.io-client';
import Modal from './Modal';
import iziToast from 'izitoast';

const Socket = Io();

//Socket Connect
function SocketConnect(User, setGroups, setConversations) {
    const { Token } = User;
    _Put(Token, { Status: true }).then(user => {
        if (user) {
            localStorage.setItem('User', JSON.stringify({ 'User': user, 'Token': Token }));
        }
        _get(User, setGroups, setConversations);
    });
}

//Socket On Chat:Room
function HandleRoom(Conversations, room, setGroups, setConversations, Storage) {
    const { User } = Storage;
    if (room.Members.filter(item => item === User._id).length >= 1 && Conversations.filter(item => {
        return item.Group === undefined ?
            item.Members.filter(user => user._id === User._id) <= 0 :
            item.Group.Members.filter(user => user._id === User._id) <= 0
    })) {
        _get(Storage, setGroups, setConversations);
    }
}

//get chats
function _get(User, setGroups, setConversations) {
    const { Token } = User;
    ConversationController._GetGroups(Token).then(groups => {
        if (groups) {
            groups.map((item, index) => {
                Socket.emit('Room:Join', item._id);
            });
            setGroups(groups);
        }
    });
    ConversationController._Get(Token).then(conversations => {
        if (conversations) {
            conversations.map((item, index) => {
                Socket.emit('Room:Join', item._id);
            });
            setConversations(conversations);
        }
    });
}

//search conversations
function Search(text, Conversations, setSearchConversation) {
    if (text.target.value === '') {
        setSearchConversation([]);
    } else {
        setSearchConversation(Conversations.filter(item => {
            return item.Group === undefined ?
                item.Members.filter(user => user.DisplayName.includes(text.target.value.toUpperCase())).length > 0 :
                item.Group.DisplayName.includes(text.target.value.toUpperCase())
        }));
    }
}

//logout
function _Logout(Token) {
    izitoast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Hey',
        message: 'are you sure to leave?',
        position: 'center',
        buttons: [
            ['<button><b>YES</b></button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                _Put(Token, { Status: false }).then(user => {
                    localStorage.clear();
                    window.location.reload();
                }).catch(err => {
                    izitoast.error(err);
                });
            }, true],
            ['<button>NO</button>', function (instance, toast) { instance.hide({ transitionOut: 'fadeOut' }, toast, 'button'); }],
        ],
    });
}

//Change to chat
function ChangeChat(id, Storage, Conversations, setConversations, setSelect, isGroup) {
    if (isGroup) {
        GetConversationGroupChat(id, setSelect, Storage.Token);
    } else {
        GetConversationChat(id, Conversations, setConversations, setSelect, Storage);
    }
}

//get conversation group
function GetConversationGroupChat(id, setSelect, Token) {
    ConversationController._GetGroupOne(id, Token).then(conversation => {
        if (conversation !== null && JSON.stringify({}) !== JSON.stringify(conversation)) {
            setSelect(<Chat Conversation={conversation} Socket={Socket} isGroup={true}></Chat>)
        }
    }).catch(err => {
        izitoast.error(err);
    });
}

//get change image
function ChangeImageProfile(Token, File, setUpdate) {
    if (File.name !== undefined) {
        _PutUpload(Token, File).then(user => {
            if (user !== null && JSON.stringify({}) !== JSON.stringify(user)) {
                localStorage.setItem('User', JSON.stringify({ 'User': user, 'Token': Token }));
                setUpdate(true);
            }
        }).catch(err => {
            iziToast.error(err);
        });
    }
}

//get conversation
function GetConversationChat(id, Conversations, setConversations, setSelect, Storage) {
    const { Token, User } = Storage;
    ConversationController._GetOne(Token, id).then(conversation => {
        if (conversation !== null && JSON.stringify({}) !== JSON.stringify(conversation)) {
            setSelect(<Chat Conversation={conversation} Socket={Socket} isGroup={false}></Chat>);
        } else {
            ConversationController._Post({ Members: [User._id, id] }, Token).then(conversation => {
                setSelect(<Chat Conversation={conversation} Socket={Socket}></Chat>);
                setConversations(Conversations.concat([conversation]));
                Socket.emit('Chat:Room', { Members: [User._id, id] });
            }).catch(err => {
                izitoast.error(err);
            });
        }
    }).catch(err => {
        izitoast.error(err);
    });
}

//Component
const Home = () => {
    var Local = JSON.parse(localStorage.getItem('User'));

    //variable that controls the main 
    const [Select, setSelect] = useState(<ListUsers Change={(id) => ChangeChat(id, Local, Conversations, setConversations, setSelect, false)} />);
    const [Groups, setGroups] = useState([]);
    const [Conversations, setConversations] = useState([]);
    const [SearchConversation, setSearchConversation] = useState([]);
    const [Update, setUpdate] = useState(false)
    const ref = useRef(false);

    useEffect(() => {
        if (!ref.current) {
            _get(Local, setGroups, setConversations);
            ref.current = true;
        }
        if (Local !== null) {
            const Handle = (data) => HandleRoom(Conversations.concat(Groups), data, setGroups, setConversations, Local);
            const HandleConnect = () => SocketConnect(Local, setGroups, setConversations);
            Socket.on('Chat:Room', Handle);
            Socket.on('connect', HandleConnect);
            return () => {
                Socket.off('Chat:Room', Handle);
                Socket.off('connect', HandleConnect);
            }
        }
    });

    useEffect(() => {
        if (Update) Local = JSON.parse(localStorage.getItem('User'));
        setUpdate(false);
    }, [Update])

    if (Local != null) {
        const { User, Token } = Local;

        return (
            <div className="container-fluid h-100 animated fadeIn h-100">
                <div className="row h-100">
                    <nav className="col-md-3 col-xl-2 d-none d-md-block bg-light sidebar gradient ">
                        <div className="row pt-3 justify-content-center">
                            <div className="col-6 col-lg-5 col-xl-4 col-md-5 align-self-center">
                                <div className="hovereffect rounded-circle float-right">
                                    <img className="rounded-circle img-fluid float-right" src={User.UrlImage} />
                                    <div className="overlay rounded-circle float-right">
                                        <input type="file" name="imageUpload" id="imageUpload" style={{ visibility: 'hidden' }} accept="image/x-png,image/gif,image/jpeg" onChange={(files) => ChangeImageProfile(Token, files.target.files[0], setUpdate)} />
                                        <label for="imageUpload">
                                            <i className="fas fa-upload text-white"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col align-self-center">
                                <div className="row">
                                    <h6 className="text-center font-weight-bold text-white">
                                        {User.Username}
                                    </h6>
                                </div>
                                <div className="row">
                                    <span>
                                        <i className="fas fa-meteor" style={{ color: 'green' }}></i>
                                    </span>
                                    <h6 className="text-center text-white pl-1">Online</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100 justify-content-between mx-0 pt-3">
                            <button type="button" className="btn btn-link text-white" onClick={() => setSelect(<ListUsers Change={(id) => ChangeChat(id, Local, Conversations, setConversations, setSelect, false)}></ListUsers>)}>
                                <i className="fas fa-users fa-lg"></i>
                            </button>
                            <button type="button" className="btn btn-link text-white">
                                <i className="fas fa-user-times fa-lg"></i>
                            </button>
                            <button type="button" className="btn btn-link text-white" onClick={() => _Logout(Token)}>
                                <i className="fas fa-sign-out-alt fa-lg"></i>
                            </button>
                        </div>
                        <div className="row pt-3 justify-content-center">
                            <div className="input-group w-75">
                                <input className="form-control py-2 border-right-0 border bg-transparent text-white" type="search" placeholder="Seek conversation" onChange={(text) => Search(text, Conversations.concat(Groups), setSearchConversation)} />
                                <span className="input-group-append">
                                    <div className="btn btn-link border-left-0 border text-white">
                                        <i className="fa fa-search"></i>
                                    </div>
                                </span>
                            </div>
                        </div>
                        {
                            SearchConversation.length >= 1 ?
                                <div className="row pt-3 justify-content-center">
                                    <ListConversations Conversations={SearchConversation} Change={(id, isGroup) => ChangeChat(id, Local, Conversations, setConversations, setSelect, isGroup)}></ListConversations>
                                </div>
                                :
                                <div className="row pt-3 justify-content-center">
                                    <div className="accordion w-100" id="accordionExample">
                                        <div className="card bg-transparent w-100">
                                            <div className="card-header" id="headingOne">
                                                <h2 className="mb-0">
                                                    <button className="btn text-white w-100" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="collapse">
                                                        <h6 className="text-center font-weight-bold text-white float-left">Direct Messages</h6>
                                                        <span className="float-right"><i className="fas fa-angle-double-down text-white"></i></span>
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                <div className="card-body px-0 pt-0 pb-0">
                                                    <ListConversations Conversations={Conversations} Change={(id, isGroup) => ChangeChat(id, Local, Conversations, setConversations, setSelect, isGroup)}></ListConversations>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card bg-transparent">
                                            <div className="card-header" id="headingTwo">
                                                <h2 className="mb-0">
                                                    <div className="row w-100 mx-0 justify-content-between">
                                                        <button className="btn text-white w-75" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" id="collapse">
                                                            <h6 className="text-center font-weight-bold text-white float-left">Groups</h6>
                                                            <span className="float-right"><i className="fas fa-angle-double-down text-white"></i></span>
                                                        </button>
                                                        <button className="btn text-white w-25" type="button" data-toggle="modal" data-target="#Modal">
                                                            <span className="float-right"><i className="fas fa-plus-circle text-white"></i></span>
                                                        </button>
                                                    </div>
                                                </h2>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div className="card-body px-0 pt-0 pb-0">
                                                    <ListConversations Conversations={Groups} Change={(id, isGroup) => ChangeChat(id, Local, Conversations, setConversations, setSelect, isGroup)}></ListConversations>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-xl-10 pt-3 px-4">
                        {Select}
                    </main>
                </div>
                <Modal Id="Modal" Title="Add Group" Content={<AddGroup Conversations={Conversations} Add={(group) => setGroups(Groups.concat(group))} Socket={Socket}></AddGroup>}></Modal>
            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/Login' }}></Redirect>
        );
    }
}

export default Home;