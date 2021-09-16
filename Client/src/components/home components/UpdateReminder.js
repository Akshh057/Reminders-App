import React, { useState } from "react";
import "./createReminder.css";
import axios from "axios";
import API from "../../axiosCalls";
const UpdateReminder = (props) => {
  const [updateReminder, setupdateReminder] = useState({
    title: props?.location?.existinRem?.title,
    d: props.location?.existinRem?.date,
    description: props.location?.existinRem?.description,
    _id: props?.location?.existinRem?.id,
  });
  const insert = (e) => {
    setupdateReminder({
      ...updateReminder,
      [e.target.name]: e.target.value,
    });
  };
  const save = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        body: JSON.stringify(updateReminder),
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
    const res = await API.updateReminders(updateReminder, config)
    res.data && props.history.push("/")
  };
  console.log(props);
  return (
    <div className="createReminder__main1">
      <div className="createReminder__main">
        <div className="createReminder__bg"></div>
        <div className="createReminder__form">
          <div className="createReminder__heading">
            <h3>UPDATE REMINDER</h3>
          </div>
          <div className="createReminder__content">
            <form onSubmit={save}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={insert}
                value={updateReminder.title}
              />
              <input
                type="text"
                name="d"
                placeholder=" Enter Date"
                onChange={insert}
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => (e.target.type = "text")}
                value={updateReminder.d}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={insert}
                value={updateReminder.description}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "5vh",
                  width: "40%",
                }}
              >
                <input type="checkbox" title="phone" id="phone" />
                <label for="phone">Phone</label>
                <input
                  type="checkbox"
                  title="phone"
                  id="Email"
                  className="createreminder__check"
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

export default UpdateReminder;
