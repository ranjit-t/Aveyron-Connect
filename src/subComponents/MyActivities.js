import React from "react";
// import { activities } from "../Data/activities";
import "./MyActivities.css";
import { useNavigate } from "react-router-dom";
import useActivities from "../Data/AllActivities";
import { signedUser, db } from "../Firebase/config";
import bell from "../Images/notification-png.png";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function MyActivities() {
  const navigate = useNavigate();

  const allActivities = useActivities();

  const now = new Date().getTime(); // get the current time

  const pastActivities = allActivities.filter(
    (act) =>
      act.email === signedUser.email && new Date(act.date).getTime() < now
  );
  const upcomingActivities = allActivities.filter(
    (act) =>
      act.email === signedUser.email && new Date(act.date).getTime() >= now
  );

  const handleDelete = async (signedUserUID, actID) => {
    const activityId = signedUserUID + actID;
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmed) {
      // // Delete the activity from the Firestore database
      const ref = doc(db, "activities", activityId);
      await deleteDoc(ref);
      // Remove actID from the organized array in the users collection

      const userDocRef = doc(db, "users", signedUserUID);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, { organized: arrayRemove(actID) });
      }

      localStorage.removeItem("allActivities");
      window.location.reload();
      // navigate("/profile");
    }
  };
  return (
    <div className="my-activities-page">
      {upcomingActivities.length > 0 && (
        <div className="my-activities-list">
          <h3>Activités à venir</h3>
          {upcomingActivities.map((act, indx) => {
            return (
              <div key={indx} className="my-activities-map">
                <div
                  onClick={() => {
                    navigate(`/activity/${act.id}`);
                  }}
                >
                  <p style={{ lineHeight: "1.3" }}>
                    <b>{act.name}</b>
                  </p>
                  <p>{act.date}</p>
                  <p>{act.city}</p>
                </div>
                <p
                  className="delete-activity"
                  onClick={() => handleDelete(signedUser.uid, act.id)}
                >
                  Annuler
                </p>
                <p className="notifications">
                  <img src={bell} alt="Comments" width="50px" />
                  <span>{act.comments.length}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      {pastActivities.length > 0 && (
        <div className="my-activities-list">
          <h3>Activités passées</h3>
          {pastActivities.map((act, indx) => {
            return (
              <div
                key={indx * indx}
                className="my-activities-map past-activities"
                onClick={() => {
                  navigate(`/activity/${act.id}`);
                }}
              >
                <div>
                  <p style={{ lineHeight: "1.3" }}>
                    <b>{act.name}</b>
                  </p>
                  <p>{act.date}</p>
                  <p>{act.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {upcomingActivities.length === 0 && pastActivities.length === 0 && (
        <p>
          Vous n'avez rien organisé jusqu'à présent{" "}
          <button
            className="add-btn"
            onClick={() => {
              navigate("/create-activity");
            }}
          >
            Créer des sorties
          </button>
        </p>
      )}
    </div>
  );
}
