import React from "react";

export default function OrganiseActivity() {
  const handleOrganizeActivity = () => {
    // navigate("/add-activity");
  };
  return (
    <div>
      <div>
        <div className="profile-header">
          <h3>Hello, Amélie!</h3>
        </div>

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
      </div>
    </div>
  );
}
