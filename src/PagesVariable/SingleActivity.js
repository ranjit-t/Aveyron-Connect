import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleActivity.css";
import { db, signedUser, auth } from "../Firebase/config";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
// import useActivities from "../Data/AllActivities";
import { collection, getDocs } from "firebase/firestore";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SingleActivity() {
  const navigate = useNavigate();
  const [commented, setCommented] = useState(false);
  const [loading, setLoading] = useState(true);

  const [act, setAct] = useState(null);
  const { id } = useParams();

  // const allActivities = useActivities();
  // console.log(allActivities);

  const now = new Date().getTime(); // get the current time

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
        <p>...Chargement</p>
      </div>
    );
  }
  if (!signedUser) {
    return (
      <div className="not-loggedin">
        <p>Veuillez vous connecter pour accéder à cette page</p>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Connexion
        </button>
      </div>
    );
  }

  return (
    <div>
      {act ? (
        <div className="single-activity-page">
          <Carousel
            showThumbs={false}
            showStatus={false}
            interval={2000}
            autoPlay={true}
            infiniteLoop={true}
            swipeable={true} // enable swiping
            swipeScrollTolerance={10} // set minimum scroll amount
            showIndicators={false}
            className="event-gallery"
          >
            <div>
              <img
                src="https://images.unsplash.com/photo-1614713568397-b31b779d0498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1725&q=80"
                alt={act.name}
                className="slider-image"
              />
            </div>
          </Carousel>
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
            <b>Adresse: </b>
            {act.address} , {act.city}
          </p>
          <p>
            <b>Organisé par: </b>
            <span
              style={{
                cursor: "pointer",
                color: "#226000",
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
            <b>Qui arrive: </b>
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
                      color: "#226000",
                      fontWeight: "bold",
                    }}
                  >
                    {part.user}
                    {separator}
                  </span>
                );
              })}
          </p>

          {new Date(act.date).getTime() >= now && (
            <div>
              {act.participants.some(
                (participant) => participant.email === signedUser.email
              ) ? (
                <div>
                  <p>Génial, vous participez à cet événement !</p>
                  <p style={{ fontSize: "12px" }}>
                    si vous changez d'avis, vous pouvez l'annuler
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
                    Annuler
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
                  Participer
                </button>
              )}
            </div>
          )}

          <div className="comment-section">
            <div className="comment-input">
              <input
                type="text"
                placeholder="Avez-vous des questions ou autre chose?"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
              />
              <button onClick={handleComment}>Ajouter</button>
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
          <p>Votre Internet prend trop de temps à charger</p>
        </div>
      )}
    </div>
  );
}
