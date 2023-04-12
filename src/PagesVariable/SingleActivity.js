import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { activities } from "../Data/activities";
import "./SingleActivity.css";
import { db, signedUser } from "../Firebase/config";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

export default function SingleActivity() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(signedUser);
  }, []);

  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  var activities = JSON.parse(localStorage.getItem("allActivities"));

  const [act, setAct] = useState(
    activities.filter((act) => act.id === parseInt(id))[0]
  );

  const handleComment = () => {
    if (newComment) {
      const updatedComments = [
        ...act.comments,
        {
          user: "User",
          comment: newComment,
          time: new Date().toLocaleString(),
        },
      ];
      const updatedAct = { ...act, comments: updatedComments };
      setAct(updatedAct);
      setNewComment("");
    }
  };

  if (!signedUser) {
    return <p style={{ marginTop: "45px" }}>Goto Activity Search</p>;
  }

  return (
    <div className="single-activity-page">
      <h2>{act.name}</h2>
      <p>{act.description}</p>
      <p>
        <b>Date: </b>
        {act.date}
      </p>
      <p>
        <b>Timings: </b>
        {act.timing}
      </p>
      <p>
        <b>Address: </b>
        {act.address} , {act.city}
      </p>
      <p>
        <b>Organized by: </b>
        <span
          style={{ cursor: "pointer", color: "#097396", fontWeight: "bold" }}
          onClick={() => {
            navigate("/user-profile/1");
          }}
        >
          {act.organizer}
        </span>
      </p>
      <p>
        <b>Participants: </b>
        {act.participants &&
          act.participants.map((part, idx) => {
            const isLast = idx === act.participants.length - 1;
            const separator = isLast ? "" : ", ";
            return (
              <span key={idx}>
                {part.user}
                {separator}
              </span>
            );
          })}
      </p>
      <div>
        {act.participants.some(
          (participant) => participant.email === signedUser.email
        ) ? (
          <button
            className="attend-button not-attending"
            onClick={async () => {
              const updatedParticipants = act.participants.filter(
                (participant) => participant.email !== signedUser.email
              );

              const actDocRef = doc(db, "activities", act.uid + act.id);
              const userDoc = await getDoc(actDocRef);
              if (userDoc.exists()) {
                await updateDoc(actDocRef, {
                  participants: updatedParticipants,
                });

                //Removing from participated
                const userDocRef = doc(db, "users", signedUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                  await updateDoc(userDocRef, {
                    participated: arrayRemove(act.id),
                  });
                }

                const updatedAct = {
                  ...act,
                  participants: updatedParticipants,
                };
                setAct(updatedAct);
              }
            }}
          >
            Remove Attending
          </button>
        ) : (
          <button
            className="attend-button "
            onClick={async () => {
              const updatedParticipants = [
                ...act.participants,
                { user: signedUser.displayName, email: signedUser.email },
              ];

              const actDocRef = doc(db, "activities", act.uid + act.id);
              const actDoc = await getDoc(actDocRef);
              if (actDoc.exists()) {
                await updateDoc(actDocRef, {
                  participants: updatedParticipants,
                });
                const updatedAct = {
                  ...act,
                  participants: updatedParticipants,
                };
                setAct(updatedAct);
              }
              // adding to participated
              const userDocRef = doc(db, "users", signedUser.uid);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const participatedActivities = [
                  ...userData.participated,
                  act.id,
                ];
                await updateDoc(userDocRef, {
                  participated: participatedActivities,
                });
                console.log(
                  `Activity ${id} added to user ${signedUser.uid}'s organized activities.`
                );
              }

              // // Remove allActivities from localStorage
              // localStorage.removeItem("allActivities");
            }}
          >
            Attend
          </button>
        )}
      </div>

      <div className="comment-section">
        <div className="comment-input">
          <input
            type="text"
            placeholder="Avez-vous des questions?"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <button onClick={handleComment}>Comment</button>
        </div>
        {act.comments.length > 0 ? (
          act.comments
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map((com, index) => {
              return (
                <div className="each-comment" key={index}>
                  <p>
                    <b>{com.user}:</b> <span>{com.comment}</span>
                    <span className="time-stamp">{com.time}</span>
                  </p>
                </div>
              );
            })
        ) : (
          <div className="each-comment" key={Math.random()}>
            <p style={{ paddingBottom: "10px" }}>No comments</p>
          </div>
        )}
      </div>
    </div>
  );
}
