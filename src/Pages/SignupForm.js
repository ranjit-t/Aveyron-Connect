import React, { useState } from "react";
import { auth, db, storage } from "../Firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

import "./SignupForm.css";

const SignupForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userUID, setuserUID] = useState("");
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

    setErrorMessage("Submitting...");

    const uploadPhotoFunc = async () => {
      const imageRef = ref(storage, `${email}.jpg`);

      const uploadTask = uploadBytesResumable(imageRef, profilePhoto);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setProfilePhotoURL(downloadURL);
          });
        }
      );
    };
    const signUpFunc = async () => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setuserUID(userCredential.user.uid);
    };

    const storingData = async () => {
      try {
        const userData = {
          userID: userUID,
          displayName: displayName,
          email: email,
          dob: dob,
          password: password,
          profilePhoto: profilePhotoURL,
        };
        const userDocRef = doc(collection(db, "users"), userUID);
        await setDoc(userDocRef, userData);
        console.log("User data stored successfully");
      } catch (error) {
        console.error(error);
        setErrorMessage("Error storing user data. Please try again later.");
      }
    };

    try {
      await uploadPhotoFunc();
      await signUpFunc();
      await storingData();
      setErrorMessage("Registered successfully");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error registering user. Please try again later.");
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
