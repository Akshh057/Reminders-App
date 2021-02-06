import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserAuthContext from "../context/UserAuthContext";
import './About.css';
const About = () => {
    const str = useContext(UserAuthContext);
    return (
        <div className="landing__pageab">
            <div className="landing__page__leftab">
                <div className="infoab">
                    <h2>
                        What we do
              </h2>
                </div>
                <div className="info2ab">
                    <p>
                        We always look to solve problems through our innovative ideas and E'DAY Reminder is one of them.
                        Users can increase their productivity with this app.
                    </p>
                </div>
                <div className="infobtnab">
                    <Link to='/login'>
                        <button className="info__btnab">
                            Get Started!
            </button>
                    </Link>
                </div>
            </div>
            <div className="landing__page__rightab">

            </div>
        </div>
    )
}

export default About
