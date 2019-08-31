import React from 'react';
import Message from './Message';

function Chat() {
    return (
        <div className="card bg-transparent chat">
            <div className="card-header border-shadow">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle ml-2" alt="Cinque Terre" height={30} width={30} />
                            <p className="font-weight-bold text-white mb-0 ml-2">KillGamer16</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-shadow overflow-auto">
                {
                    [1, 2, 2, 3, 4, 5, 6, 6, 7, 1, 3, 5, 2].map((item, index) => <Message></Message>)
                }
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                    <div className="input-group-append">
                        <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
