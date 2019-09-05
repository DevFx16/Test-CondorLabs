import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import ConversationController from '../Controllers/Conversation.controller';

function Chat({ Conversation, Socket }) {
    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    const Member = Conversation.Members.filter(function (item) {
        return item._id !== User._id;
    });
    const IndexUser = Conversation.Members.findIndex(item => item._id === User._id);
    const [Messages, setMessages] = useState(Conversation.Messages);
    Socket.on('Chat:Message', (data) => {
        if (data.Room === Conversation._id) {
            Socket.emit('Chat:Typing', { Room: Conversation._id, Username: 'is not typing' });
            setMessages(Messages.concat([data.Message]));
        }
    });

    Socket.on('Chat:Typing', (data) => {
        document.getElementById('typing').innerHTML = data.Room === Conversation._id && data.Username !== 'is not typing' ? `<h6 className="animated fadeIn">${data.Username} is typing...</h6>` : '';
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    });

    useEffect(() => {
        setMessages(Conversation.Messages);
    }, [Conversation._id]);

    useEffect(() => {
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }, [Messages]);

    function PushMessage() {
        const text = document.getElementById('Message').value;
        if (text !== null && text !== '') {
            ConversationController._Put({
                'Message': text,
                'IndexUser': IndexUser
            }, Token, Conversation._id).then(message => {
                Socket.emit('Chat:Message', {
                    Room: Conversation._id,
                    Message: message.Messages[message.Messages.length - 1]
                });
                Socket.emit('Chat:Typing', { Room: Conversation._id, Username: 'is not typing' });
                document.getElementById('Message').value = '';
                setMessages(Messages.concat([message.Messages[message.Messages.length - 1]]));
            }).catch(err => console.log(err));
        }
    }

    function OnChange(text) {
        if (text.target.value === '')
            Socket.emit('Chat:Typing', { Room: Conversation._id, Username: 'is not typing' });
    }

    return (
        <div className="card bg-transparent chat">
            <div className="card-header border-shadow">
                <div className="row">
                    <div className="col">
                        <div className="row align-items-center">
                            <img src={Member[0].UrlImage} className="rounded-circle ml-2" alt="Cinque Terre" height={30} width={30} />
                            <div className="col">
                                <p className="font-weight-bold text-white mb-0 ml-2">{Member[0].Username}</p>
                                <div id="typing" className="text-info mb-0 ml-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-shadow overflow-auto" id="scroll">
                {
                    Messages.map((item, index) => <Message Image={Conversation.Members[item.IndexUser].UrlImage} Username={Conversation.Members[item.IndexUser].Username} Message={item.Message}></Message>)
                }
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..." id="Message" style={{ resize: 'none' }} onKeyPress={() => Socket.emit('Chat:Typing', { Room: Conversation._id, Username: User.Username })} onChange={OnChange.bind(this)}></textarea>
                    <div className="input-group-append">
                        <button className="input-group-text send_btn" onClick={PushMessage.bind(this)}><i className="fas fa-location-arrow"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
