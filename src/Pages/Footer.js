import React from "react";
import "./Footer.css";
import envolope from "../Images/envolope.png";

export default function Footer() {
  return (
    <div className="App-footer">
      <div className="contact">
        <img src={envolope} alt="contact" />
        Contactez-Nous:<b>&nbsp; hello@aveyron-connect.com</b>
      </div>
      <br></br>
      <div className="footer-links">
        <ul>
          <li>Page d'accueil</li>
          <li>S'inscrire</li>
        </ul>
        <ul>
          <li>Mon profil</li>
          <li>Connexion</li>
        </ul>
        <ul>
          {/* <li>Add Activities</li>
          <li>Add Business Stores</li>
          <li>Add Events</li> */}
          <li>Rechercher des Sorties</li>
          <li>Créer des sorties</li>
        </ul>
      </div>
      <div>
        <br></br>
        <div>
          <p>&copy; 2023 Aveyron Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
