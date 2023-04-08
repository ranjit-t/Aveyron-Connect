import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { activities } from "../Data/activities";
import "./SingleActivity.css";

export default function SingleActivity() {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const act = activities.filter((act) => act.id === parseInt(id))[0];
  //   console.log(act);

  const handleComment = () => {
    if (newComment) {
      act.comments = [
        ...act.comments,
        {
          user: "User",
          comment: newComment,
          time: new Date().toLocaleString(),
        },
      ];
      setNewComment("");
    }
  };
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
          act.comments.map((com) => {
            return (
              <div className="each-comment" key={Math.random()}>
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
