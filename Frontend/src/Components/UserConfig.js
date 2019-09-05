import React from 'react'

const UserConfig = ({ }) => {
    return (
        <div className="card gradient">
            <div className="card body">
                <div className="row">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                        <div class="hovereffect">
                            <img class="img-responsive" src="http://placehold.it/350x200" alt="" />
                            <div class="overlay">
                                <h2>Change Image</h2>
                                <button type="button" class="btn btn-outline-info info">
                                    Select Image
                                    <i class="fas fa-file-image"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        </div>
    )
}

export default UserConfig
