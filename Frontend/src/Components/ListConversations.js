import React from 'react';

export default function ListMessges(props) {
    return (
        <ul className="list-group w-100 bg-transparent">
            {
                props.Conversations.map((item, index) =>
                    <li className="list-group-item bg-transparent d-flex justify-content-around align-items-start" key={index}>
                        <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle float-left" alt="Cinque Terre" width={30} height={30} />
                        <h6 className="text-center font-weight-bold text-white mb-0">KillGamer</h6>
                    </li>
                )
            }
        </ul>
    )
}
