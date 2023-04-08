import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { activities } from "../Data/activities";
import "./SingleActivity.css";

export default function SingleActivity() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
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

  //   const handleAttend = () => {
  //     if (!act.participants.includes("User")) {
  //       const updatedParticipants = [...act.participants, "User"];
  //       const updatedAct = { ...act, participants: updatedParticipants };
  //       setAct(updatedAct);
  //     }
  //   };

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
        {act.organizer}
      </p>
      <p>
        <b>Participants: </b>
        {act.participants && act.participants.join(", ")}
      </p>
      <div>
        {act.participants.includes("User") ? (
          <button
            className="attend-button not-attending"
            onClick={() => {
              const updatedParticipants = act.participants.filter(
                (participant) => participant !== "User"
              );
              const updatedAct = { ...act, participants: updatedParticipants };
              setAct(updatedAct);
            }}
          >
            Not Attending
          </button>
        ) : (
          <button
            className="attend-button "
            onClick={() => {
              if (!act.participants.includes("User")) {
                const updatedParticipants = [...act.participants, "User"];
                const updatedAct = {
                  ...act,
                  participants: updatedParticipants,
                };
                setAct(updatedAct);
              }
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