import React, { useContext } from 'react'
import CreateReminder from './CreateReminder';
import UserAuthContext from '../../context/UserAuthContext';
import UserReminder from './UserReminder';

const Middleware = (page) => {
    const { state } = useContext(UserAuthContext);
    const auth = state.isAuthenticated;
    const main = {
        height: "40vh",
        width: "50vw",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: "#fc9842",
        backgroundImage: "linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)",
        color: 'white'
    }
    console.log(page);
    if (auth && page) {
        return <CreateReminder />
    }
    else if (auth && page === "existing") {
        return <UserReminder />
    }
    else {
        return <div style={main}>
            <h1>
                Please Register/Login First!!
            </h1>
        </div>
    }
}

export default Middleware

