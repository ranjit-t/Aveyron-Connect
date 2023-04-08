import "./UserProfile.css";
import verified from "../Images/verified.png";
import React, { useState, useEffect } from "react";

export default function UserProfile() {
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

  return (
    <div className="user-profile-page">
      <img
        className="user-profile-photo"
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="user profile"
      />
      <div className="user-profile-verified">
        <h2>John Doe</h2>
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
  );
}
