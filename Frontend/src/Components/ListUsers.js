import React, { useState, useEffect } from 'react';
import { _Get } from '../Controllers/User.controller';
import Swal from 'sweetalert2';

function ListUsers() {

    const [Skip, setSkip] = useState(0);
    const [Users, setUsers] = useState([]);
    const [Backup, setBackup] = useState([])
    const { User, Token } = JSON.parse(localStorage.getItem('User'));
    const [Init, setInit] = useState(true);

    //manage state
    useEffect(() => {
        if (Init) getUsers();
    });

    //get users form backend
    function getUsers() {
        _Get(Skip, Token).then(response => {
            if (response !== null) {
                setInit(false);
                setUsers(Users.concat(response));
                setBackup(Backup.concat(response));
                setSkip(Skip + 50);
            }
        }).catch(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        });
    }

    //search users
    function Search(text) {
        if (text.target.value === '' || text.target.value === null) {
            console.log(text.target.value)
            setUsers(Backup);
        } else {
            setUsers(Backup.filter(item => {
                return item.DisplayName.toUpperCase().match(text.target.value.toUpperCase());
            }));
        }
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
                            <input className="form-control py-2 border-right-0 border bg-transparent text-white" type="search" placeholder="Search user for name" onChange={Search.bind(this)} />
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
                        Users.map((item, index) =>
                            <div className="col pb-2 align-self-center animated bounceIn">
                                <div className="card bg-transparent mr-0 px-0" style={{ width: '250px' }}>
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
                                                    <h6 className="text-center text-white">{item.Status ? 'Online' : 'Disconnected'}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <img src={item.UrlImage} className="rounded" alt="Cinque Terre" width={200} height={200} />
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
