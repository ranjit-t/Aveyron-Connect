import React, { useState } from "react";
import "./CreateActivity.css";
import { signedUser, db } from "../Firebase/config";
import { doc, setDoc } from "firebase/firestore";

const CreateActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const submitActivity = async (newActivity, signedUser) => {
    try {
      const docRef = doc(db, "activities", signedUser.uid);
      await setDoc(docRef, newActivity);
      console.log("Activity added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newActivity = {
      id: Math.floor(Math.random() * 10000),
      name: activityName,
      organizer: signedUser.displayName,
      email: signedUser.email,
      uid: signedUser.uid,
      description,
      date,
      timing: time,
      city,
      address,
      participants: [],
      comments: [],
    };
    console.log(newActivity);
    submitActivity(newActivity, signedUser);
  };

  return (
    <div className="CreateActivity-Page">
      <h3>Create Activity</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="activityName" className="form-label">
            Activity Name
          </label>
          <input
            type="text"
            id="activityName"
            name="activityName"
            className="form-input"
            value={activityName}
            onChange={(event) => setActivityName(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-input"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
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

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateActivity;
