import React from 'react';

function Message(props) {
    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    const classIma = 'rounded-circle ';
    const Image = <div className="col-1 px-0 text-center">
        <img src={props.Image} className={User.Username === props.Username ? classIma + 'mr-2' : classIma + 'ml-2'} alt="Cinque Terre" height={40} width={40} />
    </div>;
    const text = 'text-break text-white mb-0 ';
    return (
        <div className="row animated fadeIn">
            {
                User.Username !== props.Username ? Image : null
            }
            <div className="col">
                <div className={User.Username === props.Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === props.Username ? text + 'mr-2 font-weight-bold' : text + 'ml-2 font-weight-bold'}>{props.Username}</p>
                </div>
                <div className={User.Username === props.Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === props.Username ? text + 'mr-2' : text + 'ml-2'}>{props.Message}</p>
                </div>
            </div>
            {
                User.Username === props.Username ? Image : null
            }
        </div>
    )
}

export default Message
