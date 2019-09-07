import React, { useState, useEffect, useRef } from 'react';
import { _Get, _GetName } from '../Controllers/User.controller';
import izitoast from 'izitoast';

//get users form backend
function getUsers(Skip, Token, ref, Users, setUsers, Backup, setBackup, setSkip) {
    _Get(Skip, Token).then(response => {
        if (response !== null) {
            ref.current = false;
            setUsers(Users.concat(response));
            setBackup(Backup.concat(response));
            setSkip(Skip + 50);
        }
    }).catch(err => {
        izitoast.error(err);
    });
}

//search user
function Search(SkipSearch, Token, setUsers) {
    var name = document.getElementById('search').value;
    if (name !== null && name !== '') {
        _GetName(SkipSearch, Token, name).then(response => {
            if (response !== null) {
                setUsers(response);
            }
        }).catch(err => {
            izitoast.error(err);
        });
    }
}

//Component
const ListUsers = ({ Change }) => {

    const [Skip, setSkip] = useState(0);
    const [SkipSearch, setSkipSearch] = useState(0);
    const [Users, setUsers] = useState([]);
    const [Backup, setBackup] = useState([]);
    const { Token } = JSON.parse(localStorage.getItem('User'));
    const ref = useRef(true);

    //manage state
    useEffect(() => {
        if (ref.current) getUsers(Skip, Token, ref, Users, setUsers, Backup, setBackup, setSkip);
    });

    //onChangeInput
    function onChange(text) {
        if (text.target.value === '' || text.target.value === null)
            setUsers(Backup);
    }

    return (
        <div className="card bg-transparent chat">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h3 className="font-weight-bold text-white mx-0 px-0">Users</h3>
                    </div>
                    <div className="col">
                        <div className="input-group w-100">
                            <input className="form-control py-2 border-right-0 border bg-transparent text-white" id="search" type="search" placeholder="Search user for name" onChange={onChange.bind(this)} />
                            <span className="input-group-append">
                                <button className="btn btn-link border-left-0 border text-white" onClick={() => Search(SkipSearch, Token, setUsers)}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body border-shadow overflow-auto">
                <div className="row justify-content-start">
                    {
                        Users.map((item, index) =>
                            <div className="col col-md-6 col-lg-5 col-xl-4 pb-2 align-self-center animated bounceIn">
                                <div className="card bg-transparent mr-0 px-0" >
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col">
                                                <div className="row ml-2">
                                                    <h6 className="font-weight-bold text-white">
                                                        {item.DisplayName}
                                                    </h6>
                                                </div>
                                                <div className="row ml-2">
                                                    <span>
                                                        <i className="fas fa-meteor" style={{ color: item.Status ? 'green' : 'red' }}></i>
                                                    </span>
                                                    <h6 className="text-center ml-1 text-white">{item.Status ? 'Online' : 'Disconnected'}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body align-self-center">
                                        <img src={item.UrlImage} className="rounded" alt="Cinque Terre" width={200} height={200} />
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary w-100 gradient" onClick={() => Change(item._id)}>
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
