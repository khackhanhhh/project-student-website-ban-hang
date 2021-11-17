import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.component.css'
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(
            e.target.value
        );
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value
        );
    }

    
    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username,
            password,
        };
        console.log(username)

        axios.post('/api/users/login/', user)
            .then(res => {
                console.log(res.data);
                window.location='/';
            })
            .catch(() => {
                alert('Login fail')
            }
            )
            

    }
    return (
        <div className="container1 pt-5">
        <div className="d-flex justify-content-center h-100">
          <div className="card mt-5">
            <div className="card-header mt-3">
              <h3 className="text-center">Sign in</h3>  
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
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" value="Login" className="btn float-right login_btn " />
                </div>
              </form>
            </div>
            <div className="card-footer mb-5">
              <div className="d-flex justify-content-center links">
                Don't have an account?<a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
}
export default Login

        
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