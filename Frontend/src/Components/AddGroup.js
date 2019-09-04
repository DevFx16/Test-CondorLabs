import React, { useState } from 'react';

const AddGroup = ({ Conversations }) => {

    const [Tags, setTags] = useState([]);

    return (
        <div className="card gradient">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <form onSubmit={() => { }} id="form" noValidate action="javascript:;">
                            <div className="input-group pt-3 w-100">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="pass"><i className="fa fa-user-tag"></i></span>
                                </div>
                                <input type="text" className="form-control" id="Name" placeholder="Name" aria-describedby="name" required minLength={4} maxLength={30}></input>
                                <div className="invalid-feedback">Invalid name.</div>
                            </div>
                            <div class="input-group pt-3 w-100">
                                <div class="dropdown w-100">
                                    <button type="button" class="btn dropdown-toggle w-100 text-dark bg-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select User
                                    </button>

                                    <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuLink">
                                        <button type="button" class="dropdown-item" onClick={() => setTags(Tags.concat(['Value']))}>
                                            {
                                                Conversations.map((item, index) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="row align-items-center">
                                                                    <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle float-left" alt="Cinque Terre" width={25} height={25} />
                                                                    <h6 className="text-center font-weight-bold text-black mb-0 ml-2" >
                                                                        Fernando Araujo
                                                                </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row pt-3">
                    {
                        Tags.map((item, index) => {
                            return (
                                <div className="col animated bounceIn">
                                    <span class="badge badge-pill badge-primary">Primary</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-primary w-100 bg-transparent" id="collapse">
                    <p className="text-center font-weight-bold text-white mb-0">
                        <span className="pr-1"><i className="fas fa-plus fa-lg"></i></span>
                        Add Group
                    </p>
                </button>
            </div>
        </div>
    )
}

export default AddGroup
