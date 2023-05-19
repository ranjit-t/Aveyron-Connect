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
          <li>
            <a href="/">Page d'accueil</a>
          </li>
          <li>
            <a href="/signup">S'inscrire</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/profile">Mon profil</a>
          </li>
          <li>
            <a href="/login">Connexion</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/activity-search">Rechercher des Sorties</a>
          </li>
          <li>
            <a href="/create-activity">Créer des sorties</a>
          </li>
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
