import React from "react";
import "./Footer.css";
import envolope from "../Images/envolope.png";

export default function Footer() {
  return (
    <div className="App-footer">
      <div className="contact">
        <img src={envolope} alt="contact" />
        Contact Us : <b>hello@aveyron-connect.com</b>
      </div>
      <br></br>
      <div className="footer-links">
        <ul>
          <li>Home</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
        <ul>
          <li>Search Activities</li>
          <li>Search Business Stores</li>
          <li>Search Events</li>
        </ul>
        <ul>
          <li>Add Activities</li>
          <li>Add Business Stores</li>
          <li>Add Events</li>
        </ul>
      </div>
      <div>
        <br></br>
        <div>
          <p>&copy; 2023 Aveyron Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
