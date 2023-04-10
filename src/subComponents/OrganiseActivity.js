import React from "react";
import useUsers from "../Data/AllUsers";
import { signedUser } from "../Firebase/config";

export default function OrganiseActivity() {
  const allUsers = useUsers();
  const current = allUsers.filter((doc) => doc.userID === signedUser.uid)[0];
  // console.log(current[0]);

  const handleOrganizeActivity = () => {
    // navigate("/add-activity");
  };

  return (
    <div>
      <div>
        <div className="profile-header">
          <h3>
            Hello, <br></br>
            <span>{current ? current.displayName : " Amélie!"}</span>
          </h3>
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
