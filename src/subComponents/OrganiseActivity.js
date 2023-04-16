import React from "react";
import useUsers from "../Data/AllUsers";
import { signedUser } from "../Firebase/config";
import { useNavigate } from "react-router-dom";

export default function OrganiseActivity() {
  const allUsers = useUsers();
  const current = allUsers.filter((doc) => doc.userID === signedUser.uid)[0];
  // console.log(current[0]);
  const navigate = useNavigate();

  const handleOrganizeActivity = () => {
    navigate("/create-activity");
  };

  return (
    <div>
      <div>
        <div className="profile-header">
          <h3>
            Hello, <br></br>
            <span>{current ? current.displayName : " Amélie!"}</span>
          </h3>
        </div>

        <div className="add-activity-container">
          <p>
            <b>Comment allez-vous aujourd'hui ?</b>{" "}
          </p>
          <p>
            Envie d'organiser une activité dans votre région et de vous
            connecter avec les gens autour de vous ? alors pourquoi tard? Allez
            ajouter votre activité sur Aveyron-Connect.
          </p>
          <div>
            <button className="add-btn" onClick={handleOrganizeActivity}>
              Créer des sorties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
