import React from 'react';
import ListConversations from './ListConversations';
import Message from './Message';

function Home() {

    return (
        <div className="container-fluid h-100 animated fadeIn h-100">
            <div className="row h-100">
                <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar gradient ">
                    <div className="row pt-3 justify-content-center">
                        <div className="col-5">
                            <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle float-right" alt="Cinque Terre" />
                        </div>
                        <div className="col">
                            <div className="row">
                                <h6 className="text-center font-weight-bold text-white">
                                    KillGamer
                                </h6>
                            </div>
                            <div className="row">
                                <span>
                                    <i className="fas fa-meteor" style={{ color: 'green' }}></i>
                                </span>
                                <h6 className="text-center text-white pl-1">Online</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 justify-content-between mx-0 pt-3">
                        <div className="col">
                            <button type="button" className="btn btn-link text-white" onClick={() => console.log('Hol')}>
                                <i className="fas fa-users fa-lg"></i>
                            </button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-link text-white">
                                <i className="fas fa-user-cog fa-lg"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row pt-3 justify-content-center">
                        <div className="input-group w-75">
                            <input className="form-control py-2 border-right-0 border bg-transparent text-white" type="search" placeholder="Seek conversation" />
                            <span className="input-group-append">
                                <div className="btn btn-link border-left-0 border text-white">
                                    <i className="fa fa-search"></i>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="row pt-3 justify-content-center">
                        <div className="accordion w-100" id="accordionExample">
                            <div className="card bg-transparent w-100">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn text-white w-100" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="collapse">
                                            <h6 className="text-center font-weight-bold text-white float-left">Direct Messages</h6>
                                            <span className="float-right"><i className="fas fa-angle-double-down text-white"></i></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body px-0 pt-0 pb-0">
                                        <ListConversations></ListConversations>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-transparent">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="btn text-white w-100" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" id="collapse">
                                            <h6 className="text-center font-weight-bold text-white float-left">Groups</h6>
                                            <span className="float-right"><i className="fas fa-angle-double-down text-white"></i></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body px-0 pt-0 pb-0">
                                        <ListConversations></ListConversations>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div className="card bg-transparent chat">
                        <div className="card-header border-shadow">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle ml-2" alt="Cinque Terre" height={30} width={30} />
                                        <p className="font-weight-bold text-white mb-0 ml-2">KillGamer16</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body border-shadow overflow-auto">
                            {
                                [1,2,2,3,4,5,6,6,7,1,3,5,2].map((item,index) => <Message></Message>)
                            }
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                                <div className="input-group-append">
                                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home;