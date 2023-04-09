import React, { useState, useEffect } from "react";
import "./Profile.css";
import settings from "../Images/settings.png";
import myactivitiesIcon from "../Images/myactivities.png";
import addact from "../Images/addact.png";
import attend from "../Images/attend.png";

import verified from "../Images/verified.png";
import UserSettings from "../subComponents/UserSettings";
import OrganiseActivity from "../subComponents/OrganiseActivity";
import MyActivities from "../subComponents/MyActivities";

export default function Profile() {
  const currentUserEmail = "john@example.com";
  //Karma Score
  const [count, setCount] = useState(0);
  const currentScore = 160;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < currentScore) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 3);
    return () => clearInterval(intervalId);
  }, [count, currentScore]);

  const [profileMenu, setprofileMenu] = useState("organise");

  return (
    <div className="profile-details">
      <div className="own-user-profile" style={{ textAlign: "center" }}>
        <img
          className="user-profile-photo"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="user profile"
        />
        <div className="user-profile-verified">
          <h2>Amélie Puech</h2>
          <img src={verified} alt="verified" />
        </div>

        <p className="karma-score">
          <b>Karma Score:</b>
          {count}
        </p>
        <p>
          <b>Age:</b>28
        </p>
        <p>
          <b>City:</b>Rodez
        </p>
        <p>
          <b>Activities Organized:</b>5
        </p>
        <p>
          <b>Activities Attented:</b>12
        </p>
      </div>
      <div className="profile-container">
        <div className="profile-menu">
          <div
            className={profileMenu === "organise" ? "active" : ""}
            onClick={() => {
              setprofileMenu("organise");
            }}
          >
            <img src={addact} alt="Settings" className="settings-icon" />
            <p className="mobile-remove">Organise</p>
          </div>
          <div
            className={profileMenu === "myactivities" ? "active" : ""}
            onClick={() => {
              setprofileMenu("myactivities");
            }}
          >
            <img
              src={myactivitiesIcon}
              alt="Settings"
              className="settings-icon"
            />
            <p className="mobile-remove">My Activities</p>
          </div>
          <div
            className={profileMenu === "attending" ? "active" : ""}
            onClick={() => {
              setprofileMenu("attending");
            }}
          >
            <img src={attend} alt="Settings" className="settings-icon" />
            <p className="mobile-remove">Participations</p>
          </div>
          <div
            className={profileMenu === "settings" ? "active" : ""}
            onClick={() => {
              setprofileMenu("settings");
            }}
          >
            <img src={settings} alt="Settings" className="settings-icon" />
            <p className="mobile-remove">Parametres</p>
          </div>
        </div>
        <div>
          {profileMenu === "myactivities" && (
            <MyActivities currentUserEmail={currentUserEmail}></MyActivities>
          )}
        </div>
        <div>
          {profileMenu === "organise" && <OrganiseActivity></OrganiseActivity>}
        </div>
        <div>{profileMenu === "settings" && <UserSettings></UserSettings>}</div>
      </div>
    </div>
  );
}
