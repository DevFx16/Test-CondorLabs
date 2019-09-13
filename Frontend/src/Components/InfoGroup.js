import React, { useState } from 'react';
import { _PutUpload } from '../Controllers/Group.controller';

const InfoGroup = ({ Group }) => {

    const [Loading, setLoading] = useState(false);
    const [Conversations, setConversations] = useState([]);

    return (
        <div className="card gradient">
            <div className="card-body">
                <div className="row justify-content-center" style={{ height: '100px' }}>
                    <div className="hovereffect rounded-circle" style={{ width: '100px' }}>
                        {
                            Loading ? <div class="spinner-border text-light" role="status">
                                <span class="sr-only">Loading...</span>
                            </div> : <img className="rounded-circle img-fluid" src={Group.UrlImage} alt="Profile Photo" id="photo" onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'} />
                        }
                        <div className="overlay rounded-circle">
                            <input type="file" name="imageUpload" id="imageUpload" style={{ visibility: 'hidden' }} accept="image/x-png,image/gif,image/jpeg" />
                            <label for="imageUpload">
                                <i className="fas fa-upload text-white"></i>
                            </label>
                        </div>
                    </div>
                </div>
                <h5 className="text-white text-center pt-1">{Group.DisplayName}</h5>
                <div className="row">
                    <div className="col">
                        <h5 className="text-white text-center pt-1">Members</h5>
                        <ul className="list-group w-100 bg-transparent" style={{ maxHeight: '170px' }}>
                            {
                                Group.Members.map((Member, index) =>
                                    <div className="list-group-item bg-transparent d-flex justify-content-start align-items-center">
                                        <img src={Member.UrlImage} className="rounded-circle float-left" alt="Cinque Terre" width={30} height={30} onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'} />
                                        <h6 className="text-center font-weight-bold text-white mb-0 ml-1">{Member.DisplayName}</h6>
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                    <div className="col">
                        <h5 className="text-white text-center pt-1">Conversations</h5>
                        <ul className="list-group w-100 bg-transparent" style={{ maxHeight: '170px' }}>
                            {
                                Conversations.map((Member, index) =>
                                    <div className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                                        <img src={Member.UrlImage} className="rounded-circle float-left" alt="Cinque Terre" width={30} height={30} onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'} />
                                        <h6 className="text-center font-weight-bold text-white mb-0 ml-1">{Member.DisplayName}</h6>
                                        <button className="btn text-white float-right" type="button">
                                            <span><i className="fas fa-plus-circle text-white"></i></span>
                                        </button>
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoGroup;
