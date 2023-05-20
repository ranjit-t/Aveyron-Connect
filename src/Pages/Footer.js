import React from "react";
import "./Footer.css";
import envolope from "../Images/envolope.png";
import googleplay from "../Images/Appgoogleplay.png";
import applestore from "../Images/AppAppStore.png";
import facebook from "../Images/facebook.png";
import instagram from "../Images/instagram.png";

export default function Footer() {
  return (
    <div className="App-footer">
      <div className="contact">
        <img src={envolope} alt="contact" />
        Contactez-Nous:<b>&nbsp; hello@aveyronici.com</b>
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
            <a href="/stores">Rechercher des Magasins</a>
          </li>
        </ul>
      </div>
      <div className="appstores">
        <p style={{ fontSize: "20px" }}>
          {" "}
          Application mobile bientôt disponible
        </p>
        <img src={googleplay} alt="googleplay" />
        <img src={applestore} alt="applestore" />
        <div className="social-media">
          <a
            href="https://www.facebook.com/aveyronici"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="facebook" />
          </a>
          <a
            href="https://instagram.com/aveyronici"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="facebook" />
          </a>
        </div>
      </div>

      <div>
        {/* <br></br> */}
        <div>
          <p>&copy; 2023 Aveyron-ICI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
