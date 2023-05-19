import React from "react";
import "./Home.css";

import Logo from "../Images/ici-laveyron.png";
import marketing from "../Images/marketing.png";
// import euro from "../Images/euro.png";
import eco from "../Images/eco.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-section1">
        <div className="head-description">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "250px", height: "auto", marginBottom: "20px" }}
          />
          <p>C'est quoi AVEYRON-ICI ?</p>
          <p>
            AVEYRON-ICI est une plateforme sociale qui aide les Aveyronnais à se
            connecter entre eux.
            <span style={{ display: "block" }}>
              Ici, vous pouvez créer des sorties ou participer à des sorties
              créées par d'autres.
            </span>
          </p>
          <p style={{ maxWidth: "900px" }}>
            Nous propose également de découvrir les meilleurs magasins qui sont
            sélectionnés en fonction de leur qualité, de leur réputation et de
            leur service.
          </p>
        </div>
        {/* <img
          className="home-section1-img"
          src="https://images.unsplash.com/photo-1547573855-87265780bfbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80"
          alt="People"
        ></img> */}
      </div>
      <div className="home-section2">
        {/* <div className="explore-events">
          <h2>Events</h2>
          <p>
            With Aveyron Connect, you'll never miss a local event again. Our
            platform allows you to browse events in your area and connect with
            others.
          </p>
          <img
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Events"
          ></img>
          <div>
            <button>Find Events</button>
          </div>
        </div> */}
        <div className="explore-activities">
          <h2>Sorties</h2>
          <p>Trouvez des sorties dans votre ville et participez-y</p>
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Communities"
          ></img>
          <div>
            <button
              onClick={() => {
                navigate("/activity-search");
              }}
            >
              Sorties
            </button>
          </div>
        </div>
        <div className="explore-stores">
          <h2>Magasins</h2>
          <p>Trouver un magazin de proximité</p>
          <img
            src="https://images.unsplash.com/photo-1519822472072-ec86d5ab6f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Communities"
          ></img>
          <div>
            <button
              onClick={() => {
                navigate("/stores");
              }}
            >
              Magasins
            </button>
          </div>
        </div>
      </div>
      <hr style={{ width: "70%", marginTop: "40px" }} />
      <h2>Créer des Sorties</h2>
      <div className="home-section3">
        <div className="organize-activity-content">
          <p>
            Si vous cherchez un moyen de pimenter votre semaine ou votre
            week-end. Explorer votre région ou les attractions à proximité peut
            être une manière amusante et créative. Commencez par réfléchir à
            quelques idées avec votre groupe. Vous pouvez planifier un
            pique-nique dans un parc à proximité, faire une randonnée à pied ou
            à vélo sur un sentier local, visiter un musée ou une galerie d'art,
            ou essayer un nouveau restaurant ou café.
          </p>
          <p>
            Vous pouvez même planifier une sortie thématique basée sur un
            intérêt commun, comme une réunion d'un club de lecture dans une
            bibliothèque locale ou une soirée cinéma à la maison. Avec un peu de
            créativité et d'efforts, vous pouvez créer des sorties mémorables
            que tout le monde appréciera.
          </p>
          <div>
            <button
              className="add-activity-btn"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Créer des Sorties
            </button>
          </div>
        </div>

        <div className="organize-activity-image">
          <img
            src="https://images.unsplash.com/photo-1592753054398-9fa298d40e85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80"
            alt="activity"
          />
        </div>
      </div>
      <h2>Vous gérez une entreprise ?</h2>
      <div className="home-section4">
        <div className="add-business-image">
          <img
            src="https://images.pexels.com/photos/4473360/pexels-photo-4473360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="business"
          />
        </div>

        <div className="pro-account-proposal">
          <p>
            Vous souhaitez mettre en avant votre entreprise sur AVEYRON-ICI ?
            Contactez-nous avec votre entreprise et nous l'étudierons.
          </p>
          <p>
            AVEYRON-ICI propose une plateforme qui vous permet de toucher un
            public plus large et de vous connecter avec des personnes soucieuses
            de l'environnement qui partagent vos valeurs.
          </p>
          <ul>
            <li>
              <img src={marketing} alt="Visibility" className="pro-icon" />
              Visibilité accrue : atteignez un public plus large d'individus
              soucieux de l'environnement qui partagent vos valeurs.
            </li>
            <li>
              <img src={eco} alt="Eco-friendly" className="pro-icon" />
              Marketing respectueux de l'environnement : utilisez nos stratégies
              de marketing sans papier pour réduire votre empreinte carbone et
              attirer des clients partageant les mêmes idées.
            </li>

            {/* <li>
              <img src={euro} alt="Euro" className="pro-icon" />
              Only €10 for a lifetime pro account: enjoy all the benefits of a
              pro account without any ongoing subscription costs.
            </li> */}
          </ul>

          <p>
            <b>
              Ensemble, nous pouvons créer un avenir plus durable et faire un
              impact positif sur l'environnement.
            </b>
          </p>

          <div>
            <a href="mailto:hello@aveyronici.com">
              <button className="add-btn" style={{ marginBottom: "50px" }}>
                Contactez-Nous
              </button>
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
