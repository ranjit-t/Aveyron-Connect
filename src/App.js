// import "./App.css";
// import EventsSearch from "./Pages/EventsSearch";
// import SignupForm from "./Pages/SignupForm";

// function App() {
//   return (
//     <div className="App">
//       <h1>Aveyron Connect</h1>
//       <EventsSearch></EventsSearch>
//       <SignupForm></SignupForm>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import EventsSearch from "./Pages/EventsSearch";
import Homepage from "./Pages/Homepage";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";

import SingleEvent from "./Pages/SingleEvent";

import Logo from "./Images/aveyron-connect.png";

import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import Profile from "./Pages/Profile";

function App() {
  const [isOpen, setOpen] = useState(false);

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
              HomePage
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              My Profile
            </NavLink>
            <NavLink className="nav-link" to="/event-search">
              Events
            </NavLink>
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
              HomePage
            </NavLink>
            <NavLink
              className="nav-link"
              to="/signup"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Signup
            </NavLink>
            <NavLink
              className="nav-link"
              to="/login"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Login
            </NavLink>
            <NavLink
              className="nav-link"
              to="/profile"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              My Profile
            </NavLink>
            <NavLink
              className="nav-link"
              to="/event-search"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              Events
            </NavLink>
          </div>
        </div>

        <Routes>
          <Route path="/signup" element={<SignupForm></SignupForm>} />
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/" element={<Homepage></Homepage>} />
          <Route path="/event-search" element={<EventsSearch></EventsSearch>} />
          <Route path="/event/:id" element={<SingleEvent></SingleEvent>} />
          <Route path="/profile" element={<Profile></Profile>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
