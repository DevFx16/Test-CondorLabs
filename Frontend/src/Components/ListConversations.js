import React from 'react';

export default function ListMessges(props) {

    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    return (
        <ul className="list-group w-100 bg-transparent">
            {
                props.Conversations.map((item, index) => {
                    var member = item.Members.filter(function (item) {
                        return item._id !== User._id;
                    });
                    return (
                        <button className="list-group-item bg-transparent d-flex justify-content-around align-items-center" key={index} onClick={() => props.Change(member[0]._id)}>
                            <img src={member[0].UrlImage} className="rounded-circle float-left" alt="Cinque Terre" width={30} height={30} />
                            <h6 className="text-center font-weight-bold text-white mb-0">{member[0].DisplayName}</h6>
                        </button>
                    )
                })
            }
        </ul>
    )
}
