import React, { useState } from 'react';

const InfoGroup = ({ Group }) => {

    const [Loading, setLoading] = useState(false);

    return (
        <div className="card gradient">
            <div className="card-body">
                <div className="row justify-content-center">
                    <div className="col align-self-center" style={{ height: '100px' }}>
                        <div className="hovereffect rounded-circle float-left">
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
                        <h6 className="text-white">{Group.DisplayName}</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col align-self-center">
                        {
                            Group.Members.map((Member, index) =>
                                <div className="row">
                                    <div className="col">
                                        <div className="row align-items-center">
                                            <img src={Member.UrlImage} className="rounded-circle float-left" alt="Cinque Terre" width={25} height={25} onError={(img) => img.target.src = 'https://image.flaticon.com/icons/svg/660/660611.svg'} />
                                            <h6 className="text-center font-weight-bold text-black mb-0 ml-2" >
                                                {Member.DisplayName}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoGroup;
