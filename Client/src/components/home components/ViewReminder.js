import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ViewReminder = (props) => {
    const delReminder = async () => {
        const id = props.id;
        const config = {
            headers: {
                'Content-type': 'application/json',
                body: JSON.stringify(id),
                'x-auth-token': localStorage.getItem('token'),
            }
        }
        const res = await axios.delete('http://localhost:5000/users/deleteReminder', { params: { id } }, config);
        console.log(res.data);
    }
    return (
        <div>
            <div style={{ backgroundColor: props.backgroundcolor.backgroundColor, backgroundImage: props.backgroundcolor.backgroundImage, color: 'white', height: "5vh", minWidth: '20vw' }}>
                <h3 style={{ textAlign: 'center' }}>
                    Reminder: {props.i + 1}
                </h3>
            </div>
            <div style={{ minHeight: "40vh", minWidth: '20vw', padding: '0.5rem' }}>
                <p>
                    Title:  {props.title}
                </p>
                <p>
                    Id : {props.id}
                </p>
                <p>
                    Description: {props.description}
                </p>
                <p>
                    Notify on: {props.date}
                </p>
                <button>
                    Edit
                </button>
                <button onClick={delReminder}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ViewReminder
//backgroundColor: props.backgroundcolor.backgroundColor, backgroundImage: props.backgroundcolor.backgroundImage