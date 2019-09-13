import React from 'react';

function Message({ Image, Username, Message }) {
    const { User } = JSON.parse(localStorage.getItem('User'));
    const text = 'text-break text-white mb-0 ';
    const ImageView = <img src={Image} className={User.Username === Username ? 'rounded-circle mr-2' : 'rounded-circle ml-2'} alt="Profile" height={40} width={40} onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'} />;
    return (
        <div className="row animated fadeIn delay-500ms pt-1 align-items-center">
            {
                User.Username !== Username ? ImageView : null
            }
            <div className="col">
                <div className={User.Username === Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === Username ? text + 'mr-0-md mr-1 font-weight-bold' : text + 'ml-1 font-weight-bold'}>{Username}</p>
                </div>
                <div className={User.Username === Username ? 'row justify-content-end' : 'row'}>
                    <p className={User.Username === Username ? text + 'mr-1' : text + 'ml-1'}>{Message}</p>
                </div>
            </div>
            {
                User.Username === Username ? ImageView : null
            }
        </div>
    )
}

export default Message
