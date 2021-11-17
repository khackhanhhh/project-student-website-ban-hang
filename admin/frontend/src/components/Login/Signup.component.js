import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.component.css'

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onChangeUsername = (e) => {
        setUsername(
            e.target.value
        );
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value
        );
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value
        );
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username,
            password,
            email,
        };

        axios.post('/api/users/signup/', user)
            .then(res => {
                console.log(res.data);
                alert('Sign up success')
                window.location = '/login';
            })
            .catch(() => {
                alert('Sign up fail')
            }
            )


    }
    return (
        <div className="container1 img-fluid pt-5">
            <div className="d-flex justify-content-center h-100">
                <div className="card mt-5">
                    <div className="card-header mt-3">
                        <h3 className="text-center">Sign up</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user" /></span>
                                </div>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={username}
                                    onChange={onChangeUsername}
                                    placeholder="username"
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key" /></span>
                                </div>
                                <input type="password"
                                    required
                                    className="form-control"
                                    value={password}
                                    onChange={onChangePassword}
                                    placeholder="password"
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-envelope-square" /></span>
                                </div>
                                <input type="gmail"
                                    required
                                    className="form-control"
                                    value={email}
                                    onChange={onChangeEmail}
                                    placeholder="gmail"
                                />
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <input type="submit" value="Sign up" className="btn float-right login_btn " />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer mb-5">
                        <div className="d-flex justify-content-center links">
                        Do have an account ?<a href="/login">Sign in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="container-sm  p-5 " >
        //     <h3 >Login</h3>
        //     <form onSubmit={onSubmit} >

        //         <div className="form-group row">
        //             <label>User Name : </label>
        //             <input type="text"
        //                 required
        //                 className="form-control"
        //                 value={username}
        //                 onChange={onChangeUsername}
        //             />
        //         </div>
        //         <div className="form-group row" >
        //             <label>Password : </label>
        //             <input type="password"
        //                 required
        //                 className="form-control"
        //                 value={password}
        //                 onChange={onChangePassword}
        //             />
        //         </div>

        //         <div className="form-group">
        //             <input type="submit" value="Login" className="btn btn-primary" />
        //         </div>
        //     </form>
        // </div>
    );
}
export default Signup

