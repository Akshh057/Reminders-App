import React, { useContext } from 'react'
import UserAuthContext from '../../context/UserAuthContext';
import './write.css';
import write from './feedback.png'
import axios from 'axios';
const Write = () => {
    const { state } = useContext(UserAuthContext);
    let id1, feed = '';
    if (state.user) {
        id1 = state.user.id;
        feed = state.user.feed;
    }
    else {
        id1 = null;
        feed = null;
    }
    let feedback = {
        feed: '',
        choice: '',
        _id: id1,
    }
    console.log(feed)
    const insert = (e) => {
        feedback[e.target.name] = e.target.value;
        console.log(feedback);
    }

    const onSave = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/users/feedback', feedback);
        console.log(res.data);
    }
    return (
        <div className="write__main">
            <div className="write__left">
                <img src={write} alt="feedback" />
            </div>
            <div className="write__right">
                <div className="write__card">
                    {!feed ?
                        (
                            <>
                                <div className="write__heading">
                                    <h1>
                                        Feedback Form
                                    </h1>
                                </div>
                                <div className="write__details">
                                    <form onSubmit={onSave}>
                                        <label for='f1'>Describe Your Expierence with us!</label>
                                        <textarea rows='10' cols='20' id='f1' name='feed' onChange={insert} />
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                                            <label for='f2'> Rate us on the scale of 5!</label>
                                            <div className="feed_radio">
                                                <input type='radio' name='choice' id='f2' value='1' onClick={insert} />
                                                <input type='radio' name='choice' id='f2' value='2' onClick={insert} />
                                                <input type='radio' name='choice' id='f2' value='3' onClick={insert} />
                                                <input type='radio' name='choice' id='f2' value='4' onClick={insert} />
                                                <input type='radio' name='choice' id='f2' value='5' onClick={insert} />
                                            </div>
                                        </div>
                                        <input type='submit' className='feedback__btn' value='Submit' />
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div style={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: " #FF7043", backgroundColor: " #fff5f5" }}>
                                <h3>
                                    Feedback already Submitted!
                                </h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Write
