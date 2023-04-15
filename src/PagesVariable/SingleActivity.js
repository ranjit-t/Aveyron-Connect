import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleActivity.css";
import { db, signedUser, auth } from "../Firebase/config";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
// import useActivities from "../Data/AllActivities";
import { collection, getDocs } from "firebase/firestore";

export default function SingleActivity() {
  const navigate = useNavigate();
  const [commented, setCommented] = useState(false);
  const [loading, setLoading] = useState(true);

  const [act, setAct] = useState(null);
  const { id } = useParams();

  // const allActivities = useActivities();
  // console.log(allActivities);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 800);
    // console.log(signedUser);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      let activitiesArray = [];
      try {
        const colRef = collection(db, "activities");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach((doc) => {
          activitiesArray.push(doc.data());
        });
        // setAllActivities(activitiesArray);
        setAct(activitiesArray.filter((act) => act.id === parseInt(id))[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
  }, [id, commented]);

  const [newComment, setNewComment] = useState("");

  const handleComment = async () => {
    if (newComment) {
      const updatedComments = [
        ...act.comments,
        {
          user: auth.currentUser.displayName,
          userUID: signedUser.uid,
          comment: newComment,
          time: new Date().toLocaleString(),
        },
      ];

      const actDocRef = doc(db, "activities", act.uid + act.id);
      const actDoc = await getDoc(actDocRef);
      // console.log(actDoc.data());
      if (actDoc.exists()) {
        await updateDoc(actDocRef, {
          comments: updatedComments,
        });
      }
      // setActivities(activitiesFetchData);
      const updatedAct = { ...act, comments: updatedComments };
      setAct(updatedAct);
      setNewComment("");
      setCommented((prev) => !prev);
    }
  };

  if (loading) {
    return (
      <div className="not-loggedin">
        <p>...Loading</p>
      </div>
    );
  }
  if (!signedUser) {
    return (
      <div className="not-loggedin">
        <p>Please Sign in to Access this Page</p>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      {act ? (
        <div className="single-activity-page">
          <h2>{act.name}</h2>
          <p className="activity-description">{act.description}</p>
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
              style={{
                cursor: "pointer",
                color: "#097396",
                fontWeight: "bold",
              }}
              onClick={() => {
                navigate(`/user-profile/${act.uid}`);
              }}
            >
              {act.organizer}
            </span>
          </p>
          <p className="activity-participants">
            <b>Participants: </b>
            {act.participants &&
              act.participants.map((part, idx) => {
                const isLast = idx === act.participants.length - 1;
                const separator = isLast ? "" : ", ";
                return (
                  <span
                    key={idx}
                    onClick={() => {
                      navigate(`/user-profile/${part.userUID}`);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#097396",
                      fontWeight: "bold",
                    }}
                  >
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
              <div>
                <p>Awesome, You are attending this event!</p>
                <p style={{ fontSize: "12px" }}>
                  if you changed your mind, you can cancel it
                </p>

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
              </div>
            ) : (
              <button
                className="attend-button "
                onClick={async () => {
                  // console.log(auth.currentUser.displayName);
                  const updatedParticipants = [
                    ...act.participants,
                    {
                      user: auth.currentUser.displayName,
                      email: signedUser.email,
                      userUID: signedUser.uid,
                    },
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
                .slice()
                .reverse()
                .map((com, index) => {
                  return (
                    <div className="each-comment" key={index}>
                      <p>
                        <b
                          onClick={() => {
                            navigate(`/user-profile/${com.userUID}`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {com.user}:
                        </b>{" "}
                        <span>{com.comment}</span>
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
      ) : (
        <div className="not-loggedin">
          <p>Your Internet is taking too long to Load</p>
        </div>
      )}
    </div>
  );
}
