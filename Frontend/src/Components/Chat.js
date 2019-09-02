import React, { useState, useEffect } from 'react';
import Message from './Message';
import { _Put } from '../Controllers/Conversation.controller';

function Chat(props) {
    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    const Member = props.Conversation.Members.filter(function (item) {
        return item._id !== User._id;
    });
    const IndexUser = props.Conversation.Members.findIndex(item => item._id === User._id);
    const [Messages, setMessages] = useState(props.Conversation.Messages);
    useEffect(() => {
        setMessages(props.Conversation.Messages);
    }, [props.Conversation._id]);

    useEffect(() => {
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    });

    props.Socket.on('Chat:Message', (data) => {
        setMessages(Messages.concat([data.Message]));
    });

    function PushMessage() {
        const text = document.getElementById('Message').value;
        if (text !== null && text !== '') {
            _Put({
                'Message': text,
                'IndexUser': IndexUser
            }, Token, props.Conversation._id).then(message => {
                props.Socket.emit('Chat:Message', {
                    Room: props.Conversation._id,
                    Message: message.Messages[message.Messages.length - 1]
                });
                setMessages(Messages.concat([message.Messages[message.Messages.length - 1]]));
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="card bg-transparent chat">
            <div className="card-header border-shadow">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img src={Member[0].UrlImage} className="rounded-circle ml-2" alt="Cinque Terre" height={30} width={30} />
                            <p className="font-weight-bold text-white mb-0 ml-2">{Member[0].Username}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-shadow overflow-auto" id="scroll">
                {
                    Messages.map((item, index) => <Message Image={props.Conversation.Members[item.IndexUser].UrlImage} Username={props.Conversation.Members[item.IndexUser].Username} Message={item.Message}></Message>)
                }
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..." id="Message"></textarea>
                    <div className="input-group-append">
                        <button className="input-group-text send_btn" onClick={PushMessage.bind(this)}><i className="fas fa-location-arrow"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
