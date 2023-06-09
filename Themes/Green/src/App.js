import { auth } from "./Firebase/config";

import "./App.css";
import EventsSearch from "./Pages/EventsSearch";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";

import SingleEvent from "./PagesVariable/SingleEvent";

import Logo from "./Images/ici-laveyron.png";

import { Squash as Hamburger } from "hamburger-react";
import React, { useState, useEffect } from "react";
import Profile from "./Pages/Profile";
import AddEvent from "./PagesToAdd/AddEvent";
import ActivitiesSearch from "./Pages/ActivitiesSearch";
import Home from "./Pages/Home";
import Footer from "./Pages/Footer";
import SingleActivity from "./PagesVariable/SingleActivity";
import UserProfile from "./PagesVariable/UserProfile";
import CreateActivity from "./PagesToAdd/CreateActivity";
import Logout from "./Pages/Logout";
import { onAuthStateChanged } from "firebase/auth";
import Business from "./Pages/Business";
import SingleBusiness from "./PagesVariable/SingleBusiness";

function App() {
  const [isOpen, setOpen] = useState(false);
  const [signedUser, setsignedUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsignedUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setsignedUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <header className="homepage-header">
          {/* <h1>Aveyron Connect</h1> */}
          <a className="logo-section" href="/">
            <img src={Logo} alt="logo" className="logo" />
          </a>

          <div className="nav-bar-in-header">
            <NavLink className="nav-link" to="/">
              Accueil
            </NavLink>
            {!auth.currentUser && (
              <NavLink className="nav-link" to="/login">
                Connexion
              </NavLink>
            )}
            {!auth.currentUser && (
              <NavLink className="nav-link" to="/signup">
                S'inscrire
              </NavLink>
            )}
            {signedUser && (
              <NavLink className="nav-link" to="/profile">
                Mon Profil
              </NavLink>
            )}
            {/* <NavLink className="nav-link" to="/create-activity">
              Create Activity
            </NavLink> */}
            <NavLink className="nav-link" to="/activity-search">
              Sorties
            </NavLink>
            {signedUser && (
              <NavLink className="nav-link" to="/logout">
                Se déconnecter
              </NavLink>
            )}
          </div>
        </header>
        <div className="menu-container">
          <div className="hamburger-react">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            ></Hamburger>
          </div>
          <div className={isOpen ? "nav-bar open" : "nav-bar"}>
            <NavLink
              className="nav-link"
              to="/"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Accueil
            </NavLink>

            {!signedUser && (
              <NavLink
                className="nav-link"
                to="/login"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                Connexion
              </NavLink>
            )}
            {!signedUser && (
              <NavLink
                className="nav-link"
                to="/signup"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                S'inscrire
              </NavLink>
            )}
            {signedUser && (
              <NavLink
                className="nav-link"
                to="/profile"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                Mon Profil
              </NavLink>
            )}

            {/* <NavLink
              className="nav-link"
              to="/add-event"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Add Event
            </NavLink> */}
            {/* <NavLink
              className="nav-link"
              to="/event-search"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Events
            </NavLink> */}
            <NavLink
              className="nav-link"
              to="/activity-search"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Sorties
            </NavLink>
            <NavLink
              className="nav-link"
              to="/create-activity"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Créer des Sorties
            </NavLink>
            {signedUser && (
              <NavLink
                className="nav-link"
                to="/logout"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                Se déconnecter
              </NavLink>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/signup" element={<SignupForm></SignupForm>} />
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/" element={<Home></Home>} />
          <Route path="/event-search" element={<EventsSearch></EventsSearch>} />
          <Route path="/stores" element={<Business></Business>} />
          <Route
            path="/activity-search"
            element={<ActivitiesSearch></ActivitiesSearch>}
          />

          <Route path="/event/:id" element={<SingleEvent></SingleEvent>} />
          <Route
            path="/store/:id"
            element={<SingleBusiness></SingleBusiness>}
          />

          <Route
            path="/activity/:id"
            element={<SingleActivity></SingleActivity>}
          />
          <Route path="/profile" element={<Profile></Profile>} />
          <Route
            path="/user-profile/:uid"
            element={<UserProfile></UserProfile>}
          />
          <Route path="/add-event" element={<AddEvent></AddEvent>} />
          <Route
            path="/create-activity"
            element={<CreateActivity></CreateActivity>}
          />
          <Route path="/logout" element={<Logout></Logout>} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
