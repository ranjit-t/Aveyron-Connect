import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db, storage, auth } from "../Firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function UserSettings({ currUser }) {
  const [name, setName] = useState(currUser.displayName);
  const [city, setCity] = useState(currUser.city);
  const [dob, setDob] = useState(new Date(currUser.dob.toDate()));
  const [profilePhoto, setProfilePhoto] = useState("");
  const [message, setMessage] = useState("");

  // console.log(currUser);
  // console.log(profilePhoto);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    if (profilePhoto) {
      let photoURL;
      const imageRef = ref(storage, `${currUser.email}.jpg`);

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
      const userDocRef = doc(db, "users", currUser.userID);
      const userDoc = await getDoc(userDocRef);
      try {
        if (userDoc.exists()) {
          const updatedFields = {};
          if (name !== currUser.displayName) {
            updatedFields.displayName = name;
            updatedFields.profilePhoto = photoURL;
          }
          if (city !== currUser.city) {
            updatedFields.city = city;
            updatedFields.profilePhoto = photoURL;
          }
          if (dob.getTime() !== currUser.dob.toDate().getTime()) {
            updatedFields.dob = dob;
            updatedFields.profilePhoto = photoURL;
          }
          await updateDoc(userDocRef, updatedFields);
          const user = auth.currentUser;
          await updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
            dob: dob,
          });
          setMessage("Changes Saved");
          window.location.reload();
        }
      } catch (e) {
        console.log(e.message);
        setMessage("Oops, there is an error");
      }
    } else {
      const userDocRef = doc(db, "users", currUser.userID);
      const userDoc = await getDoc(userDocRef);
      try {
        if (userDoc.exists()) {
          const updatedFields = {};
          if (name !== currUser.displayName) {
            updatedFields.displayName = name;
          }
          if (city !== currUser.city) {
            updatedFields.city = city;
          }
          if (dob.getTime() !== currUser.dob.toDate().getTime()) {
            updatedFields.dob = dob;
          }
          await updateDoc(userDocRef, updatedFields);
          // console.log("updated");
          const user = auth.currentUser;
          await updateProfile(user, {
            displayName: name,
            dob: dob,
          });
          setMessage("Changes Saved!");
          window.location.reload();
        }
      } catch (e) {
        console.log(e.message);
        setMessage("Oops, there is an error");
      }
    }
  };

  return (
    <div className="profile-settings">
      <div className="profile-setting">
        <label>Email:</label>
        <input type="email" disabled value={currUser.email} />
      </div>
      <div className="profile-setting">
        <label htmlFor="name">Prénom(s) :</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Prénom(s)"
        />
      </div>

      <div className="profile-setting">
        <label htmlFor="city">Ville:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          placeholder="Ville"
        />
      </div>

      <div className="profile-setting">
        <label htmlFor="dob">Date de naissance</label>
        <DatePicker
          id="dob"
          name="dob"
          selected={dob}
          onChange={handleDobChange}
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          required
        />
      </div>
      <div className="profile-setting">
        <label htmlFor="profile-photo">Photo de Profil:</label>
        <input
          type="file"
          id="profile-photo"
          onChange={handleProfilePhotoChange}
        />
      </div>
      <button
        className="add-btn"
        onClick={handleSaveChanges}
        style={{ marginBottom: "50px" }}
      >
        Modifier
      </button>
      {message && <p style={{ marginTop: "-35px" }}>{message}</p>}
    </div>
  );
}
