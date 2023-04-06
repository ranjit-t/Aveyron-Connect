import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [name, setName] = useState("Amélie");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

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
    navigate("/add-activity");
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h2>Hello, Amélie!</h2>
        <label>Email:</label>
        <input type="email" disabled value="example@example.com" />
        <br />
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <br />
        <label>Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />
        <br />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <br />
        <button className="save-changes-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
      <hr />
      <div>
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
      </div>
    </div>
  );
}
