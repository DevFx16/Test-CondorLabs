import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { _Put } from '../Controllers/Conversation.controller';

function Chat(props) {
    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    const { Conversation, Socket } = props;
    var prevProps = usePrevious({ Conversation, Socket });
    const Member = Conversation.Members.filter(function (item) {
        return item._id !== User._id;
    });
    const IndexUser = Conversation.Members.findIndex(item => item._id === User._id);
    const [Messages, setMessages] = useState(Conversation.Messages);
    Socket.emit('Room:Join', Conversation._id);
    useEffect(() => {
        setMessages(Conversation.Messages);
        if (prevProps !== undefined) Socket.emit('Room:Leave', prevProps.Conversation._id);
    }, [Conversation._id]);

    useEffect(() => {
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }, [Messages]);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    Socket.on('Chat:Message', (data) => {
        if (prevProps._id === Conversation._id)
            setMessages(Messages.concat([data.Message]));
    });

    function PushMessage() {
        const text = document.getElementById('Message').value;
        if (text !== null && text !== '') {
            _Put({
                'Message': text,
                'IndexUser': IndexUser
            }, Token, Conversation._id).then(message => {
                Socket.emit('Chat:Message', {
                    Room: Conversation._id,
                    Message: message.Messages[message.Messages.length - 1]
                });
                document.getElementById('Message').value = '';
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
            <div className="card-body border-shadow bg-dark overflow-auto" id="scroll">
                {
                    Messages.map((item, index) => <Message Image={Conversation.Members[item.IndexUser].UrlImage} Username={Conversation.Members[item.IndexUser].Username} Message={item.Message}></Message>)
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
