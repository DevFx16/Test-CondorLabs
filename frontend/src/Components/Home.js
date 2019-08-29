import React from 'react';

function Home() {

    var conver = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 6, 6, 6, 7, 6, 7,]

    return (
        <div className="container-fluid h-100 animated fadeIn h-100">
            <div className="row h-100">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar gradient overflow-auto">
                    <div className="row pt-3 justify-content-center">
                        <div className="col-5">
                            <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle float-right" alt="Cinque Terre" />
                        </div>
                        <div className="col">
                            <div className="row">
                                <button type="button" className="btn btn-link" >
                                    <h6 className="text-center font-weight-bold text-white">KillGamer</h6>
                                </button>
                            </div>
                            <div className="row">
                                <span>
                                    <i className="fas fa-meteor" style={{ color: 'green' }}></i>
                                </span>
                                <h6 className="text-center text-white pl-1">Online</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <ul className="list-group w-100 bg-transparent">
                            {
                                conver.map((item, index) =>
                                    <li className="list-group-item bg-transparent d-flex justify-content-between align-items-center" key={index}>
                                        <img src="https://image.flaticon.com/icons/svg/660/660611.svg" className="rounded-circle float-right" alt="Cinque Terre" width={30} height={30} />
                                        <h6 className="text-center font-weight-bold text-white mb-0">KillGamer</h6>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                </main>
            </div>
        </div>
    )
}

export default Home;