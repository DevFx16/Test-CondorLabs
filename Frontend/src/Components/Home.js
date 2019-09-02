import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ListConversations from './ListConversations';
import Chat from './Chat';
import ListUsers from './ListUsers';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { _Put } from '../Controllers/User.controller';
import GroupsController from '../Controllers/Group.controller';
import ConversationController from '../Controllers/Conversation.controller';
import AddGroup from './AddGroup';
import Io from 'socket.io-client';

const Socket = Io();
const _user = JSON.parse(localStorage.getItem('User'));
if (_user !== null) {
    const { User, Token } = _user;
    Socket.on('connect', () => {
        console.log('Hola')
        _Put(Token, { Status: true });
        window.onbeforeunload = function () {
            _Put(Token, { Status: false });
        };
    });
}


function Home() {
    var Local = JSON.parse(localStorage.getItem('User'));

    //Change to chat
    function ChangeChat(id) {
        ConversationController._GetOne(Local.Token, id).then(conversation => {
            if (conversation !== null && JSON.stringify({}) !== JSON.stringify(conversation)) {
                setSelect(<Chat Conversation={conversation} Socket={Socket}></Chat>);
            } else {
                ConversationController._Post({ Members: [Local.User._id, id] }, Local.Token).then(conversation => {
                    setSelect(<Chat Conversation={conversation} Socket={Socket}></Chat>);
                    setInit(true);
                }).catch(err => {
                    Swal.fire(err);
                });
            }
        }).catch(err => {
            Swal.fire(err);
        });
    }

    //variable that controls the main 
    const [Select, setSelect] = useState(<ListUsers Change={ChangeChat}></ListUsers>);
    const [Groups, setGroups] = useState([]);
    const [Conversations, setConversations] = useState([]);
    const [Init, setInit] = useState(true);
    useEffect(() => {
        if (Init && Local != null) _get();
    });

    //get chats
    function _get() {
        GroupsController._Get(Local.Token).then(groups => {
            if (groups) {
                setGroups(groups);
            }
        });
        ConversationController._Get(Local.Token).then(conversations => {
            if (conversations) {
                conversations.map((item, index) => {
                    Socket.emit('Room:Leave', item._id);
                    Socket.emit('Room:Join', item._id);
                });
                setConversations(conversations);
            }
        });
        setInit(false);
    }

    if (Local != null) {
        const { User, Token } = Local;
        const MySwal = withReactContent(Swal);

        //logout
        function _Logout() {
            Swal.fire({
                title: 'are you sure to leave',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, logout!'
            }).then((result) => {
                localStorage.clear();
                _Put(Token, { Status: false });
                window.location.reload();
            });
        }

        return (
            <div className="container-fluid h-100 animated fadeIn h-100">
                <div className="row h-100">
                    <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar gradient ">
                        <div className="row pt-3 justify-content-center">
                            <div className="col-5">
                                <img src={User.UrlImage} className="rounded-circle float-right" alt="Cinque Terre" />
                            </div>
                            <div className="col">
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
                            <button type="button" className="btn btn-link text-white" onClick={() => setSelect(<ListUsers Change={ChangeChat}></ListUsers>)}>
                                <i className="fas fa-users fa-lg"></i>
                            </button>
                            <button type="button" className="btn btn-link text-white">
                                <i className="fas fa-user-cog fa-lg"></i>
                            </button>
                            <button type="button" className="btn btn-link text-white" onClick={_Logout.bind(this)}>
                                <i className="fas fa-sign-out-alt fa-lg"></i>
                            </button>
                        </div>
                        <div className="row pt-3 justify-content-center">
                            <div className="input-group w-75">
                                <input className="form-control py-2 border-right-0 border bg-transparent text-white" type="search" placeholder="Seek conversation" />
                                <span className="input-group-append">
                                    <div className="btn btn-link border-left-0 border text-white">
                                        <i className="fa fa-search"></i>
                                    </div>
                                </span>
                            </div>
                        </div>
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
                                            <ListConversations Conversations={Conversations}></ListConversations>
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
                                                <button className="btn text-white w-25" type="button" onClick={() => MySwal.fire({
                                                    showCloseButton: false,
                                                    showConfirmButton: false,
                                                    html: <AddGroup Close={() => MySwal.close()}></AddGroup>
                                                })}>
                                                    <span className="float-right"><i className="fas fa-plus-circle text-white"></i></span>
                                                </button>
                                            </div>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body px-0 pt-0 pb-0">
                                            <ListConversations Conversations={Groups}></ListConversations>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {Select}
                    </main>
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/Login' }}></Redirect>
        );
    }
}

export default Home;