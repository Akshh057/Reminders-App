import React, { useContext, useEffect, useState } from "react";
import "./createReminder.css";
import axios from "axios";
import UserAuthContext from "../../context/UserAuthContext";
import API from '../../axiosCalls'
//import create from "./create.png";
const CreateReminder = ({ history }) => {
  const { state } = useContext(UserAuthContext);
  console.log(state)
  const [newReminder, setNewReminder] = useState({
    title: "",
    d: "",
    description: "",
    email: state?.user?.email,
    mobile: state?.user?.mobile,
    sendOnEmail: false,
    sendOnMobile: false,
  });
  const insert = (e) => {
    setNewReminder({
      ...newReminder,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(newReminder);
  }, [newReminder]);
  const save = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        body: JSON.stringify(newReminder),
      },
    };
    let token = localStorage.getItem("token");
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const res = await API.createReminder(newReminder, config)
    res.data && history.push("/userreminder")
  };
  return (
    <div className="createReminder__main1">
      <div className="createReminder__main">
        <div className="createReminder__bg"></div>
        <div className="createReminder__form">
          <div className="createReminder__heading">
            <h3>CREATE REMINDER</h3>
          </div>
          <div className="createReminder__content">
            <form onSubmit={save}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={insert}
              />
              <input
                type="text"
                name="d"
                placeholder=" Enter Date"
                onChange={insert}
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={insert}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "5vh",
                  width: "40%",
                }}
              >
                <input
                  type="checkbox"
                  title="phone"
                  id="phone"
                  name="sendOnMobile"
                  onClick={(e) =>
                    setNewReminder({
                      ...newReminder,
                      sendOnMobile: e.target.checked,
                    })
                  }
                />
                <label htmlfor="phone">Phone</label>
                <input
                  type="checkbox"
                  title="phone"
                  id="Email"
                  className="createreminder__check"
                  name="sendOnEmail"
                  onClick={(e) =>
                    setNewReminder({
                      ...newReminder,
                      sendOnEmail: e.target.checked,
                    })
                  }
                />
                <label htmlfor="Email">Email</label>
              </div>
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReminder;
