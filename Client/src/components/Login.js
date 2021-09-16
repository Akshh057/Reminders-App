import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
//import { useHistory } from 'react-router-dom'
import AuthUserContext from '../context/UserAuthContext';
import { withRouter } from 'react-router-dom';
import './Login.css';
import {
  REGISTER_USER,
  REGISTER_FAILED,
  LOGIN_USER,
  LOGIN_FAILED,
} from '../context/reducer'

const Login = (props) => {
  const { state, dispatch } = useContext(AuthUserContext);
  const [active, setActive] = useState('');
  //const history = useHistory();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    check_password: "",
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      props.history.push('/');
    }
  }, [state.isAuthenticated, props.history]);

  const changeRegisterData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  const changeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }


  const signUp = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await axios.post("http://localhost:5000/users/register", registerData);
      dispatch({
        type: REGISTER_USER,
        payload: registeredUser.data,
      });
      setActive('');
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
      })
      error.response.data.msg && setServerError(error.response.data.msg);
      console.log(serverError);
    }
  }


  const signIn = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await axios.post("http://localhost:5000/users/login", loginData);
      dispatch({
        type: LOGIN_USER,
        payload: loggedUser.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
      })
      error.response?.data?.msg && setServerError(error.response.data.msg);
      console.log(serverError)
    }
  }


  return (
    <div className={`main_container ${active}`}>
      <div className="wrapper">
        <div className="form_container sign_up_container">
          <form className="sign_up_form" onSubmit={signUp}>
            <h1>Create Account</h1>
            {serverError && (
              <div className='error'>
                <small>{serverError}</small>
                <button onClick={() => setServerError('')}>
                  X</button>
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={changeRegisterData}
            /* required */
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={changeRegisterData}
            /* required */
            />
            <input
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              value={registerData.mobile}
              onChange={changeRegisterData}
            /* required */
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={changeRegisterData}
            /* required */
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={registerData.confirm_password}
              onChange={changeRegisterData}
            /* required */
            />
            <button class="main_btn" type='submit'>Sign Up</button>
          </form>
        </div>
        <div className="form_container sign_in_container">
          <form className="sign_in_form" onSubmit={signIn}>
            <h1>Sign in</h1>
            {serverError && (
              <div className='error'>
                <small>{serverError}</small>
                <button onClick={() => setServerError('')}>
                  X</button>
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={changeLoginData}
            /* required */
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={changeLoginData}
            /* required */
            />
            <button class="main_btn" type="submit">Sign in</button>
          </form>
        </div>
        <div class="overlay_container">
          <div class="overlay">
            <div class="overlay_panel overlay_left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your account.</p>
              <button
                onClick={() => {
                  setServerError('');
                  setActive('');
                }}
                class="ghost"
                id="signIn">
                Sign In
              </button>
            </div>
            <div class="overlay_panel overlay_right">
              <h1>Hello, Friend!</h1>
              <p>Create a new account and start journey with us</p>
              <button
                onClick={() => {
                  setServerError('');
                  setActive('right_panel_active');
                }}
                className="ghost"
                id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
