import React from 'react';

function ListUsers() {
    return (
        <div className="card bg-transparent chat">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h3 className="font-weight-bold text-white mx-0 px-0">Users</h3>
                    </div>
                    <div className="col">
                        <div className="input-group w-100">
                            <input className="form-control py-2 border-right-0 border bg-transparent text-white" type="search" placeholder="Search user for name" />
                            <span className="input-group-append">
                                <div className="btn btn-link border-left-0 border text-white">
                                    <i className="fa fa-search"></i>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-shadow overflow-auto">
                <div className="row justify-content-center">
                    {
                        [1, 2, 2, 3, 4, 5, 6, 6, 7, 1, 3, 5, 2].map((item, index) =>
                            <div className="col pb-2 align-self-center">
                                <div className="card bg-transparent mr-0 px-0" style={{ width: '250px' }}>
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col">
                                                <div className="row ml-2">
                                                    <h6 className="font-weight-bold text-white">
                                                        KillGamer
                                                    </h6>
                                                </div>
                                                <div className="row ml-2">
                                                    <span>
                                                        <i className="fas fa-meteor" style={{ color: 'green' }}></i>
                                                    </span>
                                                    <h6 className="text-center text-white">Online</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <img src="https://giantbomb1.cbsistatic.com/uploads/scale_small/3/33873/1700999-naruto.png" className="rounded" alt="Cinque Terre" width={200} height={200}/>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary w-100 gradient">
                                            <p className="text-center font-weight-bold text-white mb-0">
                                                <span className="pr-1"><i className="fas fa-sms fa-lg"></i></span>
                                                Start conversation
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListUsers;
