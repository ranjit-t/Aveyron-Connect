import React, { useState } from "react";
import "./CreateActivity.css";
import { signedUser, db } from "../Firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateActivity = () => {
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // new state variable

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * 10000);
    const newActivity = {
      id: id,
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
    try {
      const docRef = doc(db, "activities", signedUser.uid + id);
      await setDoc(docRef, newActivity);
      console.log("Activity added successfully!");

      // Add activity id to the "organized" array in the user's document
      const userDocRef = doc(db, "users", signedUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const organizedActivities = [...userData.organized, id];
        await updateDoc(userDocRef, { organized: organizedActivities });
        console.log(
          `Activity ${id} added to user ${signedUser.uid}'s organized activities.`
        );

        // Remove allActivities from localStorage
        localStorage.removeItem("allActivities");
        setErrorMessage("Activity added successfully!"); // clear any previous error message
        setTimeout(() => {
          navigate(`/profile`);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create activity. Please try again."); // set error message
    }
  };

  return (
    <div className="CreateActivity-Page">
      <h3>Create Activity</h3>
      {/* render error message if it exists */}
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

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
    </div>
  );
};

export default CreateActivity;
