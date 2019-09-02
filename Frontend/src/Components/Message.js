import React from 'react'

function Message(props) {
    return (
        <div className="row animated fadeIn">
            <div className="col-1 px-0 text-center">
                <img src={props.Image} className="rounded-circle ml-2" alt="Cinque Terre" height={40} width={40} />
            </div>
            <div className="col">
                <div className="row">
                    <p className="font-weight-bold text-white mb-0 ml-2">{props.Username}</p>
                </div>
                <div className="row">
                    <p className="text-break text-white mb-0 ml-2">{props.Message}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
