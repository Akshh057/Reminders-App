import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserAuthContext from "../context/UserAuthContext";
import "./Styles/Home.css";
const Home = () => {
  const { state } = useContext(UserAuthContext);
  const auth = state.isAuthenticated;
  console.log(state);
  if (auth) {

    return <div className="app">
      <div className='container'>
        {/* {(state.user.isAuthenticated === true ? `Welocme ${state.user.name}` : "Welcome")} */}
        {/* <div className='greet'>{(state.isAuthenticated ? `Welocme ${state.user.name}` : "Welcome")}</div> */}
        <div className="home__new">
          <Link to="/createremainder">
            <div className="container__box container__box1">
              <h2>create new reminder</h2>
            </div>
          </Link>
        </div>
        <div className="home__new2">
          <Link to="/userreminder">
            <div className="container__box  container__box2">
              <h2>Your reminders</h2>
            </div>
          </Link>
        </div>
        <div className="home__new3">
          <Link to='/write'>
            <div className="container__box  container__box3">
              <h2>Write to us </h2>
            </div>
          </Link>
        </div>

        <div className="home__new4">
          <Link to='/userprofile'>
            <div className="container__box  container__box4">
              <h2>Your Account</h2>
            </div>
          </Link>
        </div>
      </div>
    </div >
  }
  else {
    return <div className="landing__page">
      <div className="landing__page__left">
        <div className="info">
          <h2>
            Never Miss your Special Occasions!
          </h2>
        </div>
        <div className="info2">
          <p>
            Create Reminders for your Special Occasions and important tasks and we will notify your through sms and email free of cost!
          </p>
        </div>
        <div className="infobtn">
          <Link to='/login'>
            <button className="info__btn">
              Get Started!
            </button>
          </Link>
        </div>
      </div>
      <div className="landing__page__right">

      </div>
    </div>
  }
};

export default Home;
