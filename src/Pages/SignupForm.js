import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import "./SignupForm.css";
const SignupForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (displayName.length < 5) {
      setErrorMessage("Display name must be at least 5 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("Submitting...");

    const data = {
      displayName: displayName,
      email: email,
      password: password,
    };

    fetch("http://localhost:3001/signupdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setErrorMessage("User Signed up successfully");
        } else if (response.status === 400) {
          setErrorMessage("Email is already in use");
        } else {
          setErrorMessage("Oops, there is an error");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Internal server error");
      });
  };

  const errorClass = errorMessage
    ? errorMessage.includes("Submitting...")
      ? "form-submitting"
      : errorMessage.includes("successfully")
      ? "form-success"
      : "form-error"
    : "";

  return (
    <div className="form-page">
      <h1 className="form-title">Sign up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-field">
          <label htmlFor="displayName" className="form-label">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            className="form-input"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <div className={`form-message ${errorClass}`}>{errorMessage}</div>
        <button type="submit" className="form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
