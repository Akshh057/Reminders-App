import React, { useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import setAuthToken from "./context/setAuthToken"
import UserAuthContext from "./context/UserAuthContext";
import { LOAD_USER } from "./context/reducer";
import CreateReminder from "./components/home components/CreateReminder";
import Write from "./components/home components/Write";
import UserReminder from "./components/home components/UserReminder";
import UpdateReminder from "./components/home components/UpdateReminder";
import Userprofile from "./components/home components/Userprofile";
import API from "./axiosCalls";

function App() {
  const { dispatch } = useContext(UserAuthContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      //get auth token if exist from last visit/session from ls
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }

      //setAuthToken in header for all req.
      setAuthToken(token);

      //check if token is valid through API and return true or false.
      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const tokenRes = await API.tokenIsValid();

      //if token is valid then get user data from private route
      // and send response data from API to state using dispatch
      if (tokenRes.data) {
        const user = await API.getUser();
        dispatch({
          type: LOAD_USER,
          payload: user.data,
        });
      }
    };
    checkLoggedIn();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/createremainder" component={CreateReminder} />
          <Route path="/write" component={Write} />
          {/* <Route path="/middleware" component={Middleware} /> */}
          <Route path="/userreminder" component={UserReminder} />
          <Route path="/updatereminder" component={UpdateReminder} />
          <Route path="/userprofile" component={Userprofile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
