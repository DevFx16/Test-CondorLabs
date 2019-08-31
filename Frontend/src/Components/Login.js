import React, { useState } from 'react';
import { _Login } from '../Controllers/User.controller';
import Swal from 'sweetalert2';
const Login = (props) => {

    const [Loading, setLoading] = useState(false);

    function _LoginSubmit() {
        const User = {
            Username: document.getElementById('Username').value,
            Password: document.getElementById('Password').value,
        };
        //validate form
        setLoading(true);
        if (validate(User.Username) && validate(User.Password)) {
            _Login(User).then(response => {
                if (response.status === 406) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'username and / or password do not match',
                    });
                } else if (response.status === 200) {
                    response.json().then(user => {
                        localStorage.setItem('User', JSON.stringify(user));
                        props.history.push('/Home');
                    });
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            });
        } else {
            document.getElementById('form').classList.add('was-validated');
        }
        setLoading(false);
    }

    //method for validate string
    function validate(text) {
        return text !== null && text !== '' && text.length >= 4 && text.length <= 30;
    }

    return (
        <div className="container h-100 animated fadeIn">
            <div className="row h-100 justify-content-center">
                <div className="col align-self-center">
                    <div className="row align-items-center pb-5">
                        <div className="col align-self-center">
                            <picture>
                                <source type="image/svg+xml" />
                                <img src="https://image.flaticon.com/icons/svg/174/174240.svg" className="rounded mx-auto d-block" alt="..." width={200} height={200} />
                            </picture>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 align-self-center">
                            <div className="card border-card">
                                <div className="card-header gradient border-shadow">
                                    <p className="text-center font-weight-bold text-white mb-0">DevChat</p>
                                </div>
                                <div className="card-body border-shadow border-bottom">
                                    <form onSubmit={_LoginSubmit.bind(this)} id="form" noValidate action="javascript:;">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="user"><i className="fa fa-user"></i></span>
                                            </div>
                                            <input type="text" className="form-control" id="Username" placeholder="Username" aria-describedby="user"  required minLength={4} maxLength={15}></input>
                                        </div>
                                        <div className="input-group pt-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="pass"><i className="fa fa-key"></i></span>
                                            </div>
                                            <input type="password" className="form-control" id="Password" placeholder="Password" aria-describedby="pass"  required minLength={4} maxLength={30}></input>
                                        </div>
                                        <div className="pt-3"></div>
                                        <div className="row justify-content-center">
                                            <div className="col align-self-center">
                                                <button type="submit" className="btn btn-primary w-100 gradient" disabled={Loading}>
                                                    {
                                                        Loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Login</span>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center pt-3">
                        <div className="col-md-3 align-self-center">
                            <button type="button" className="btn btn-primary w-100 gradient" onClick={() => props.history.push('/SignUp')} disabled={Loading}>
                                <span className="pr-1"><i className="fas fa-user-plus fa-lg"></i></span>
                                <p className="text-center font-weight-bold text-white mb-0">You do not have an account?</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login