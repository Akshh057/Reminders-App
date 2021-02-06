import React, { useContext, useState } from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import UserAuthContext from '../context/UserAuthContext'
import { LOGOUT_USER } from '../context/reducer';

const Header = (props) => {
  const { state, dispatch } = useContext(UserAuthContext)
  const [open, setOpen] = useState("open")
  const hamburger = () => {
    if (open === "")
      setOpen("open");
    else
      setOpen("")
  }

  const logout = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    //props.history.push('/');
    hamburger();
  }

  return (
    <div className='header'>
      <Link to='/'>
        <div className="header__right">

          <h1 className='logo'> E'DAY</h1> <p className="header__p"> Reminders</p>
        </div>
      </Link>
      <div
        className='hamburger'
        onClick={hamburger}
      >
        <div className='line'></div>
        <div className='line line2'></div>
        <div className='line'></div>
      </div>
      <nav className={`navbar ${open}`}>
        <Link onClick={hamburger} className='navlink' to="/">
          {state.isAuthenticated ? "Dashboard" : "Home"}
        </Link>
        {state.isAuthenticated ?
          <Link onClick={logout} className='navlink' to="/">
            Logout
        </Link> :
          <Link onClick={hamburger} className='navlink' to="/login">
            Login
        </Link>
        }
        <Link onClick={hamburger} className='navlink' to="/about">
          About us
        </Link>
        <Link onClick={hamburger} className='navlink' to="/contact">
          Contact us
        </Link>
      </nav>
    </div>
  );
};

export default Header;
