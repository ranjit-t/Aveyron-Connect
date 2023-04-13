import "./UserProfile.css";
import verified from "../Images/verified.png";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { uid } = useParams();

  //age
  function calculateAge(timestamp) {
    const birthday = new Date(timestamp * 1000);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const [count, setCount] = useState(0);
  // const allUsers = useUsers();
  const [allUsers, setAllUsers] = useState([]);

  //Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const colRef = collection(db, "users");
        const docsSnap = await getDocs(colRef);
        let usersArray = [];
        docsSnap.forEach((doc) => {
          usersArray.push(doc.data());
        });
        setAllUsers(usersArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
    // console.log(allUsers);
    // console.log(currUser);
  }, []);
  const currUser = allUsers.filter((user) => user.userID === uid)[0];
  const achievedscore = currUser
    ? parseInt(currUser.participated.length) * 5 +
      parseInt(currUser.organized.length) * 20
    : 0;
  // console.log(currUser);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < achievedscore) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 3);
    return () => clearInterval(intervalId);
  }, [count, achievedscore]);
  if (!currUser) {
    return <div>User Not Found</div>;
  }
  return (
    <div className="user-profile-page">
      <img
        className="user-profile-photo"
        src={currUser.profilePhoto}
        alt="user profile"
      />
      <div className="user-profile-verified">
        <h2>{currUser ? currUser.displayName : "User"}</h2>
        {currUser.verified && <img src={verified} alt="verified" />}
      </div>

      <p className="karma-score">
        <b>Karma Score:</b>
        {count}
      </p>
      <p>
        <b>Age:</b>
        {currUser ? calculateAge(currUser.dob.seconds) : "19"}
      </p>
      <p>
        <b>City:</b>
        {currUser ? currUser.city : "Rodez"}
      </p>
      <p>
        <b>Activities Organized:</b>
        {currUser ? currUser.organized.length : "0"}
      </p>
      <p>
        <b>Activities Attented:</b>
        {currUser ? currUser.participated.length : "0"}
      </p>
    </div>
  );
}
