import React, { useState } from "react";

export default function UserSettings() {
  const [name, setName] = useState("Amélie");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
  return (
    <div className="profile-settings">
      <div className="profile-setting">
        <label>Email:</label>
        <input type="email" disabled value="example@example.com" />
        <br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
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
  );
}
