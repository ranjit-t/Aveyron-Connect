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

import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";

function App() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <header className="homepage-header">
          <h1>Aveyron Connect</h1>
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
                console.log(isOpen);
              }}
            ></Hamburger>
          </div>
          <div className={isOpen ? "nav-bar open" : "nav-bar"}>
            <NavLink className="nav-link" to="/">
              HomePage
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/event-search">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
