import React, { useState } from "react";
import "./Profile.css";
import settings from "../Images/settings.png";
import marketing from "../Images/marketing.png";
import euro from "../Images/euro.png";
import eco from "../Images/eco.png";

export default function Profile() {
  const [name, setName] = useState("Amélie");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <h3>Hello, Amélie!</h3>
          <img
            src={settings}
            alt="Settings"
            className="settings-icon"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        {isProfileOpen && (
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
        <div className="add-activity-container">
          <p>
            <b>How are you doing, Today ?</b>{" "}
          </p>
          <p>
            In a mood to Organise an activity in your area and connect people
            around you ? then why late ? Go and add your activity on
            Aveyron-Connect.
          </p>
          <div>
            <button className="add-btn" onClick={handleOrganizeActivity}>
              Add Activity
            </button>
          </div>
        </div>
        <br></br>

        <hr style={{ width: "70%" }}></hr>

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
        </div>
      </div>
    </div>
  );
}

/* <div>
        <div>
          <p>Want to Organise an Activity ?</p>
          <button className="add-btn" onClick={handleOrganizeActivity}>
            Add Activity
          </button>
        </div>
        <div>
          <p>Want to Add your Event ?</p>
          <button className="add-btn">Add Event</button>
        </div>
        <div>
          <p>Want to Add your Business ?</p>
          <button className="add-btn">Business</button>
        </div>
      </div> */
