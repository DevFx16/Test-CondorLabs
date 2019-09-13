import React from 'react';

export default function ListMessges({ Conversations, Change }) {

    const { User } = JSON.parse(localStorage.getItem('User'));

    function Button(click, src, name, index, isGroup) {
        return (
            <button className="list-group-item bg-transparent d-flex justify-content-start align-items-center" 
            key={index} onClick={() => Change(click, isGroup)}>
                <img src={src} className="rounded-circle float-left" alt="Cinque Terre" width={30} 
                height={30} onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'}/>
                <h6 className="text-center font-weight-bold text-white mb-0 ml-1">{name}</h6>
            </button>
        )
    }

    return (
        <ul className="list-group w-100 bg-transparent">
            {
                Conversations.map((item, index) => {
                    //validate group
                    if (item.Group !== undefined && item.Group !== null) {
                        return (
                            Button(item._id, item.Group.UrlImage, item.Group.DisplayName, index, true)
                        );
                    } else {
                        //for other member
                        var member = item.Members.filter(function (item) {
                            return item._id !== User._id;
                        });
                        return (
                            Button(member[0]._id, member[0].UrlImage, member[0].DisplayName, index, false)
                        );
                    }
                })
            }
        </ul>
    )
}
