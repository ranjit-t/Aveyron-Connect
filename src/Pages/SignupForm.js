import React, { useState } from "react";
import { auth, db, storage } from "../Firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import "./SignupForm.css";

const SignupForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

    setErrorMessage("Submitting...");

    try {
      let photoURL;
      const imageRef = ref(storage, `${email}.jpg`);

      const uploadTask = uploadBytesResumable(imageRef, profilePhoto);

      // Wait for the upload task to complete before updating the profile photo URL
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                // setProfilePhotoURL(downloadURL);
                photoURL = downloadURL;
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });

      // Wait for the user to be created before setting the user UID
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // setuserUID(userCredential.user.uid);

      const userUID = userCredential.user.uid;

      // Wait for the user profile to be updated before storing user data
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
        dob: dob,
      });

      // Store user data in the database
      const userData = {
        userID: userUID,
        displayName: displayName,
        email: email,
        dob: dob,
        city: city,
        password: password,
        profilePhoto: photoURL,
        organized: [],
        participated: [],
        verified: false,
      };
      const userDocRef = doc(collection(db, "users"), userUID);
      await setDoc(userDocRef, userData);

      setErrorMessage("Registered successfully");

      navigate("/activity-search");
    } catch (error) {
      setErrorMessage("Error registering user. Please try again later.");
      console.log(error);
    }
  };

  const errorClass = errorMessage
    ? errorMessage.includes("Submitting...")
      ? "form-submitting"
      : errorMessage.includes("Registered successfully")
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
        {/* <div className="form-field">
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
        </div> */}
        <div className="form-field">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <DatePicker
            id="dob"
            name="dob"
            className="form-input"
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            value={city}
            onChange={(event) => setCity(event.target.value)}
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
