import React, { useContext } from 'react'
import './userprofile.css';
import user from './user2.png';
import UserAuthContext from '../../context/UserAuthContext';
const Userprofile = () => {
    const { state } = useContext(UserAuthContext);
    let email, name, mobile = '';
    if (state.user) {
        email = state.user.email;
        name = state.user.name;
        mobile = state.user.mobile;
    }
    else {
        email = null;
        name = null;
        mobile = null;
    }
    return (
        <div className="user__main">
            <div className="user__left">
                <img src={user} />
            </div>
            <div className="user__right">
                <div className="user__card">
                    <div className="user__heading">
                        <h1>
                            Your Profile
                        </h1>
                    </div>
                    <div className="user__details">
                        <h2>Name : {name}</h2>
                        <h2>Email : {email}</h2>
                        <h2>Mobile : {mobile}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile
