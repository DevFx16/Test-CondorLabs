import React from 'react';

function Message({Image, Username, Message}) {
    const { User } = JSON.parse(localStorage.getItem('User'));
    const classIma = 'rounded-circle ';
    const ImageView = <div className="col-2 col-md-1 px-0 text-center">
        <img src={Image} className={User.Username === Username ? classIma + 'mr-2' : classIma + 'ml-2'} alt="Cinque Terre" height={40} width={40} />
    </div>;
    const text = 'text-break text-white mb-0 ';
    return (
        <div className="row animated fadeIn">
            {
                User.Username !== Username ? ImageView : null
            }
            <div className="col">
                <div className={User.Username === Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === Username ? text + 'mr-2 mr-0-md font-weight-bold' : text + 'ml-2 ml-0-md font-weight-bold'}>{Username}</p>
                </div>
                <div className={User.Username === Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === Username ? text + 'mr-2 mr-0-md' : text + 'ml-2 ml-0-md'}>{Message}</p>
                </div>
            </div>
            {
                User.Username === Username ? ImageView : null
            }
        </div>
    )
}

export default Message
