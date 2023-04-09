import React, { useState, useEffect } from "react";
import "./Profile.css";
import settings from "../Images/settings.png";
// import marketing from "../Images/marketing.png";
// import euro from "../Images/euro.png";
// import eco from "../Images/eco.png";
import verified from "../Images/verified.png";

export default function Profile() {
  const [name, setName] = useState("Amélie");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [isProfileOpen, setIsProfileOpen] = useState(false);

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
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Logic for saving changes goes here
  };

  const handleOrganizeActivity = () => {
    // navigate("/add-activity");
  };

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
            <img src={settings} alt="Settings" className="settings-icon" />
            <p>Organise</p>
          </div>
          <div
            className={profileMenu === "activities" ? "active" : ""}
            onClick={() => {
              setprofileMenu("activities");
            }}
          >
            <img src={settings} alt="Settings" className="settings-icon" />
            <p>My Activities</p>
          </div>
          <div
            className={profileMenu === "settings" ? "active" : ""}
            onClick={() => {
              setprofileMenu("settings");
            }}
          >
            <img src={settings} alt="Settings" className="settings-icon" />
            <p>Parametres</p>
          </div>
        </div>
        <div>
          {profileMenu === "organise" && (
            <div>
              <div className="profile-header">
                <h3>Hello, Amélie!</h3>
              </div>

              <div className="add-activity-container">
                <p>
                  <b>How are you doing, Today ?</b>{" "}
                </p>
                <p>
                  In a mood to Organise an activity in your area and connect
                  people around you ? then why late ? Go and add your activity
                  on Aveyron-Connect.
                </p>
                <div>
                  <button className="add-btn" onClick={handleOrganizeActivity}>
                    Add Activity
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {profileMenu === "settings" && (
            <div className="profile-settings">
              <div className="profile-setting">
                <label>Email:</label>
                <input type="email" disabled value="example@example.com" />
                <br />
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="profile-setting">
                <label htmlFor="current-password">Current Password:</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </div>
              <div className="profile-setting">
                <label htmlFor="new-password">New Password:</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <button
                className="add-btn"
                onClick={handleSaveChanges}
                style={{ marginBottom: "50px" }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* <hr style={{ width: "70%" }}></hr>

        <div className="pro-account-proposal">
          <h3>Are you a Business Owner or Event Planner ?</h3>
          <p>
            Are you looking for a way to promote your business or events in an
            eco-friendly way? Aveyron-Connect offers a platform that allows you
            to reach a wider audience and connect with environmentally conscious
            individuals who share your values.
          </p>
          <ul>
            <li>
              <img src={marketing} alt="Visibility" className="pro-icon" />
              Increased visibility: reach a wider audience of environmentally
              conscious individuals who share your values.
            </li>
            <li>
              <img src={eco} alt="Eco-friendly" className="pro-icon" />
              Eco-friendly marketing: use our paperless marketing strategies to
              reduce your carbon footprint and attract like-minded customers.
            </li>

            <li>
              <img src={euro} alt="Euro" className="pro-icon" />
              Only €10 for a lifetime pro account: enjoy all the benefits of a
              pro account without any ongoing subscription costs.
            </li>
          </ul>
          <p>
            Sign up for a pro account on Aveyron-Connect today and start
            promoting your business or events to a community of environmentally
            conscious individuals.
          </p>
          <p>
            <b>
              Together, we can create a more sustainable future and make a
              positive impact on the environment.
            </b>
          </p>

          <div>
            <button
              className="add-btn"
              onClick={handleOrganizeActivity}
              style={{ marginBottom: "50px" }}
            >
              Sign Up for a Pro Account
            </button>
          </div>
        </div> */
