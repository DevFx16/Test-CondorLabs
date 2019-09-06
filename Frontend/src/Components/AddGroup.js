import React, { useState } from 'react';
import GroupController from '../Controllers/Group.controller';
import izitoast from 'izitoast';

//Submit group
function Submit(User, Socket, Add, Token, Tags) {
    var ids = [User._id];
    Tags.map((item, index) => {
        ids.push(item._id);
    });
    const Name = document.getElementById('Name').value;
    if (Name !== null && Name !== '' && Name.length >= 4 && Name.length <= 30) {
        GroupController._Post(Token, {
            Members: ids,
            DisplayName: Name.toUpperCase()
        }).then(group => {
            Add(group);
            izitoast.success({
                title: 'Created',
                message: 'Group has been created'
            });
            Socket.emit('Chat:Room', { Members: ids });
        }).catch(err => {
            izitoast.error(err);
        });
    } else {
        document.getElementById('form').classList.add('was-validated');
    }
}

//Component
const AddGroup = ({ Conversations, Add, Socket }) => {

    const [Tags, setTags] = useState([]);
    const { User, Token } = JSON.parse(localStorage.getItem('User'));

    function AddTag(member) {
        if (Tags.filter(item => item._id === member[0]._id) <= 0)
            setTags(Tags.concat(member));
    }

    return (
        <div className="card gradient">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <form id="form" noValidate action="javascript:;">
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
                                        {
                                            Conversations.map((item, index) => {
                                                var member = item.Members.filter(function (item) {
                                                    return item._id !== User._id;
                                                });
                                                return (
                                                    <button type="button" class="dropdown-item mt-1" onClick={() => AddTag(member)}>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="row align-items-center">
                                                                    <img src={member[0].UrlImage} className="rounded-circle float-left" alt="Cinque Terre" width={25} height={25} />
                                                                    <h6 className="text-center font-weight-bold text-black mb-0 ml-2" >
                                                                        {member[0].DisplayName}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                )
                                            })
                                        }
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
                                <div className="col animated bounceIn m-1">
                                    <span class="row badge badge-pill badge-primary align-items-center">
                                        <img src={item.UrlImage} className="rounded-circle mr-1" alt="Cinque Terre" width={25} height={25} />
                                        {item.DisplayName}
                                        <button type="button" class="btn" onClick={() => setTags(Tags.filter(tag => tag._id !== item._id))}>
                                            <i class="fas fa-trash text-white"></i>
                                        </button>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary w-100 bg-transparent" id="collapse" onClick={() => Submit(User, Socket, Add, Token, Tags)}>
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
