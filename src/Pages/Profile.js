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
import Participations from "../subComponents/Participations";
import { signedUser } from "../Firebase/config";
import { db } from "../Firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (signedUser) {
        const userDocRef = doc(db, "users", signedUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedUser]);

  //Karma Score
  const [count, setCount] = useState(-100);
  const currentScore = user
    ? parseInt(user.participated.length) * 5 +
      parseInt(user.organized.length) * 20
    : 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < currentScore) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 3);
    return () => clearInterval(intervalId);
  }, [count, currentScore]);

  // Initialize profileMenu state from localStorage
  const [profileMenu, setProfileMenu] = useState(
    localStorage.getItem("profileMenu") || "myactivities"
  );

  // Save profileMenu to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileMenu", profileMenu);
  }, [profileMenu]);

  // Click event handler for the menu items
  const handleMenuClick = (menu) => {
    setProfileMenu(menu);
  };
  //age
  function calculateAge(timestamp) {
    const birthday = new Date(timestamp * 1000);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <div>
      {user ? (
        <div className="profile-details">
          <div
            className="own-user-profile"
            style={{ textAlign: "center", minHeight: "600px" }}
          >
            <img
              className="user-profile-photo"
              src={
                user
                  ? user.profilePhoto
                  : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              }
              alt="user profile"
            />
            <div className="user-profile-verified">
              <h2>{user ? user.displayName : "User"}</h2>
              {user.verified && <img src={verified} alt="verified" />}
            </div>

            <p className="karma-score">
              <b>Karma Score:</b>
              {count}
            </p>
            <p>
              <b>Âge:</b>
              {user ? calculateAge(user.dob.seconds) : "20"}
            </p>
            <p>
              <b>Ville:</b>
              {user ? user.city : "Rodez"}
            </p>
            <p>
              <b>Activités Organisées:</b> {user.organized.length}
            </p>
            <p>
              <b>Activités Participé:</b>
              {user.participated.length}
            </p>
          </div>
          <div className="profile-container">
            <div className="profile-menu">
              <div
                className={profileMenu === "organise" ? "active" : ""}
                onClick={() => {
                  handleMenuClick("organise");
                }}
              >
                <img src={addact} alt="Settings" className="settings-icon" />
                <p className="mobile-remove">Organiser</p>
              </div>
              <div
                className={profileMenu === "myactivities" ? "active" : ""}
                onClick={() => {
                  handleMenuClick("myactivities");
                }}
              >
                <img
                  src={myactivitiesIcon}
                  alt="Settings"
                  className="settings-icon"
                />
                <p className="mobile-remove">Mes Sorties</p>
              </div>
              <div
                className={profileMenu === "attending" ? "active" : ""}
                onClick={() => {
                  handleMenuClick("attending");
                }}
              >
                <img src={attend} alt="Settings" className="settings-icon" />
                <p className="mobile-remove">Mes Participations</p>
              </div>
              <div
                className={profileMenu === "settings" ? "active" : ""}
                onClick={() => {
                  handleMenuClick("settings");
                }}
              >
                <img src={settings} alt="Settings" className="settings-icon" />
                <p className="mobile-remove">Paramètres</p>
              </div>
            </div>
            <div className="profile-component">
              {profileMenu === "myactivities" && <MyActivities></MyActivities>}
            </div>
            <div className="profile-component">
              {profileMenu === "organise" && (
                <OrganiseActivity></OrganiseActivity>
              )}
            </div>
            <div className="profile-component">
              {profileMenu === "attending" && <Participations></Participations>}
            </div>
            <div className="profile-component">
              {profileMenu === "settings" && (
                <UserSettings currUser={user}></UserSettings>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="not-loggedin">
          <p>...Chargement</p>
        </div>
      )}
    </div>
  );
}
