import React from "react";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* <header className="homepage-header">
        <h1>Aveyron Connect</h1>
        <nav>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header> */}
      <main className="homepage-main">
        <section className="homepage-section">
          <div className="homepage-section-content">
            <h2>Connect with People</h2>
            <p>
              Aveyron Connect helps you connect with people you know and meet
              new friends in your area.
            </p>
          </div>
          <div className="homepage-section-image">
            <img
              src="https://plus.unsplash.com/premium_photo-1664297563915-44764dccdb37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="People"
            ></img>
          </div>
        </section>
        <section className="homepage-section">
          <div className="homepage-section-image">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Events"
            ></img>
          </div>
          <div className="homepage-section-content">
            <h2>Find Local Events</h2>
            <p>
              With Aveyron Connect, you'll never miss a local event again. Our
              platform allows you to browse events in your area and connect with
              others who share your interests.
            </p>
          </div>
        </section>
        <section className="homepage-section">
          <div className="homepage-section-content">
            <h2>Join Communities</h2>
            <p>
              Join communities on Aveyron Connect and connect with like-minded
              individuals who share your passions and interests.
            </p>
          </div>
          <div className="homepage-section-image">
            <img
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Communities"
            ></img>
          </div>
        </section>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2023 Aveyron Connect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
