import React from 'react';

export default function ListMessges({ Conversations, Change }) {

    const { User } = JSON.parse(localStorage.getItem('User'));

    function Button(click, src, name, index) {
        return (
            <button className="list-group-item bg-transparent d-flex justify-content-start align-items-center" key={index} onClick={() => Change(click)}>
                <img src={src} className="rounded-circle float-left" alt="Cinque Terre" width={30} height={30} />
                <h6 className="text-center font-weight-bold text-white mb-0 ml-1">{name}</h6>
            </button>
        )
    }

    return (
        <ul className="list-group w-100 bg-transparent">
            {
                Conversations.map((item, index) => {
                    if (item.Group !== undefined) {
                        return (
                            Button(item._id, item.Group.UrlImage, item.Group.DisplayName, index)
                        )
                    } else {
                        var member = item.Members.filter(function (item) {
                            return item._id !== User._id;
                        });
                        return (
                            Button(member[0]._id, member[0].UrlImage, member[0].DisplayName, index)
                        )
                    }
                })
            }
        </ul>
    )
}
