import React, { useEffect, useContext, useState } from 'react'
import '../Styles/userReminder.css'
import axios from 'axios'
import UserAuthContext from '../../context/UserAuthContext';
import { Link, withRouter } from "react-router-dom";
import moment from 'moment'
import API from '../../axiosCalls';
const UserReminder = () => {
    const { state } = useContext(UserAuthContext);
    const [viewReminder, setViewReminder] = useState([]);
    let email = ''
    if (state.user)
        email = state.user.email;
    else
        email = null;
    let token = localStorage.getItem('token');
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
    useEffect(() => {
        const fetchReminder = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    body: JSON.stringify(email),
                    'x-auth-token': localStorage.getItem('token'),
                }
            }

            let remRes = await API.fetchReminder(email, config)
            console.log(remRes.data);
            setViewReminder(
                remRes.data,
            )
        }
        fetchReminder();

    }, [email])

    var colors = [
        {
            backgroundColor: '#f6d327',
            backgroundImage: 'linear-gradient(315deg, #f6d327 0%, #de4daa 74%)', //pink
        },
        {
            backgroundColor: '#fce043',
            backgroundImage: 'linear-gradient(315deg, #fce043 0%, #fb7ba2 74%)', //orange
        },
        {
            backgroundColor: '#fe7bb0',
            backgroundImage: 'linear-gradient(315deg, #fe7bb0 0%, #ff748b 74%)'
        },
        {
            backgroundColor: '#f7b42c',
            backgroundImage: 'linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)'

        },
        {
            backgroundColor: '#f977ce',
            backgroundImage: 'linear-gradient(315deg, #f977ce 0%, #c373f2 74%)',
        },
        {
            backgroundColor: '#f8ceec',
            backgroundImage: 'linear-gradient(315deg, #f8ceec 0%, #a88beb 74%)'

        }
    ];
    return (
        <div className="userReminder__main" id="div1">
            {
                viewReminder.map((e, index) => {
                    const random_color = colors[Math.floor(
                        Math.random() * colors.length)];
                    const delReminder = async () => {
                        const id = e._id;
                        const config =
                        {
                            headers:
                            {
                                'Content-type': 'application/json',
                                body: JSON.stringify(id),
                                'x-auth-token': localStorage.getItem('token'),
                            }
                        }
                        const res = await API.deleteReminder(id, config)
                        console.log(res.data);
                        setViewReminder(
                            viewReminder.filter((w) => w._id !== id)
                        )
                        console.log(viewReminder);
                    }
                    return (
                        <div key={`${e.title}${index}`}>
                            <div style={{ backgroundColor: random_color.backgroundColor, backgroundImage: random_color.backgroundImage, color: 'white', height: "5vh", minWidth: '20vw' }}>
                                <h3 style={{ textAlign: 'center' }}>
                                    Reminder: {index + 1}
                                </h3>
                            </div>
                            <div>
                                <p>
                                    Title:  {e.title}
                                </p>
                                <p>
                                    Description: {e.description}
                                </p>
                                <p>
                                    Notify on: {moment(e.date).format("HH:mm DD-MM-YYYY")}
                                </p>
                                <p>
                                    Email : {e.sendOnEmail ? "Yes" : "No"}
                                    <span style={{ marginLeft: "5px" }}> Mobile : {e.sendOnMobile ? "Yes" : "No"} </span>
                                </p>
                                <Link to={{
                                    pathname: "/updatereminder",
                                    existinRem: {
                                        title: e.title,
                                        date: moment(e.date).format("HH:mm DD-MM-YYYY"),
                                        description: e.description,
                                        id: e._id,
                                    }
                                }}>
                                    <button className="link1_button" style={{ backgroundColor: random_color.backgroundColor, backgroundImage: random_color.backgroundImage }}>
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={delReminder} style={{ backgroundColor: random_color.backgroundColor, backgroundImage: random_color.backgroundImage }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default withRouter(UserReminder)
