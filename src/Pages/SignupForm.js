import React, { useState } from "react";

import "./SignupForm.css";
const SignupForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (displayName.length < 5) {
      setErrorMessage("Display name must be at least 5 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const postImage = async () => {
      setErrorMessage("uploading...");

      try {
        // Upload profile photo to Cloudinary
        const formData = new FormData();
        formData.append("file", profilePhoto);
        formData.append("upload_preset", "aveyron-connect");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dvettesp0/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        // const profilePhotoURL = result.secure_url;
        setProfilePhotoURL(result.secure_url);
        setErrorMessage("uploaded and submitting data...");
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to upload profile photo.");
      }
    };

    const postData = async () => {
      const data = {
        userID: Math.floor(Math.random() * 1000),
        displayName: displayName,
        email: email,
        password: password,
        dob: dob,
        profilePhoto: profilePhotoURL,
      };
      alert(JSON.stringify(data));
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
            console.log(data);
            // setErrorMessage("Registered...");
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
    await postImage();
    await postData();
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
        <div className="form-field">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-input"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="profilePhoto" className="form-label">
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            className="form-input"
            onChange={(event) => setProfilePhoto(event.target.files[0])}
            required
          />
        </div>
        <div className="form-field">
          <button type="submit" className="form-submit-btn">
            Sign up
          </button>
        </div>
        <div className={`form-message ${errorClass}`}>{errorMessage}</div>
      </form>
    </div>
  );
};

export default SignupForm;
