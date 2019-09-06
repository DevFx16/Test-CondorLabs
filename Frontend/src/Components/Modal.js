import React from 'react'

const Modal = ({ Id, Content, Title }) => {
    return (
        <div class="modal fade" id={Id} tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true" data-backdrop="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{Title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {Content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
