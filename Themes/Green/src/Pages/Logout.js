import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";

export default function Logout() {
  const navigate = useNavigate();

  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
    });
  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}
