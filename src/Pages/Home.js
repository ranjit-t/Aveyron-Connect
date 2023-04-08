import React from "react";
import "./Home.css";

import marketing from "../Images/marketing.png";
import euro from "../Images/euro.png";
import eco from "../Images/eco.png";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-section1">
        <div className="head-description">
          <h1>Aveyron-Connect</h1>
          <p>C'est quoi Aveyron-Connect ?</p>
          <p>
            Aveyron Connect helps you connect with locals!
            <span style={{ display: "block" }}>
              Search for Events, Find Local Businesses and Join Communities.
            </span>
          </p>
        </div>
        <img
          className="home-section1-img"
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="People"
        ></img>
      </div>
      <div className="home-section2">
        <div className="explore-events">
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
        </div>
        <div className="explore-activities">
          <h2>Activities</h2>
          <p>
            Join communities on Aveyron Connect and connect with like-minded
            individuals who share your passions and interests.
          </p>
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Communities"
          ></img>
          <div>
            <button>Find Activities</button>
          </div>
        </div>
        <div className="explore-stores">
          <h2>Stores</h2>
          <p>
            Join communities on Aveyron Connect and connect with like-minded
            individuals who share your passions and interests.
          </p>
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Communities"
          ></img>
          <div>
            <button>Find Stores</button>
          </div>
        </div>
      </div>
      <hr style={{ width: "70%", marginTop: "40px" }} />
      <h2>Organise Events</h2>
      <div className="home-section3">
        <div className="organize-activity-content">
          <p>
            Looking for a way to explore the beauty of Aveyron? Look no further
            than Aveyron-Connect, the ultimate resource for planning your next
            adventure. With our site, you can discover unique and exciting
            activities for all ages and skill levels. From hiking and biking to
            kayaking and rock climbing, Aveyron-Connect has it all.
          </p>
          <p>
            Whether you're a seasoned outdoor enthusiast or just looking for a
            fun weekend activity, Aveyron-Connect is the perfect place to start.
            Our easy-to-use platform allows you to search for activities by
            location, activity type, and more. You can even book your activity
            directly through our site, making planning your next adventure a
            breeze.
          </p>
          <div>
            <button className="add-activity-btn">Organise An Activity</button>
          </div>
        </div>

        <div className="organize-activity-image">
          <img
            src="https://images.unsplash.com/photo-1592753054398-9fa298d40e85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80"
            alt="activity"
          />
        </div>
      </div>
      <h2>Add Your Business</h2>
      <div className="home-section4">
        <div className="add-business-image">
          <img
            src="https://images.pexels.com/photos/4473360/pexels-photo-4473360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="business"
          />
        </div>
        {/* <div className="add-business-content">
          <p>
            Want to boost your business's visibility? Add your business to our
            platform and reach a wider audience. With our site, you can connect
            with potential customers who are looking for businesses just like
            yours. By listing your business on our platform, you can increase
            your online presence and attract more customers.
          </p>
          <p>
            Whether you're a small business just starting out or an established
            company looking to expand your reach, adding your business to our
            platform is a smart choice. Our easy-to-use platform allows you to
            create a profile for your business and showcase your products and
            services. You can even receive reviews from satisfied customers and
            build your reputation as a trusted business in your community.
          </p>
          <button className="add-business-btn">Add Your Business</button>
        </div> */}
        <div className="pro-account-proposal">
          <p>
            Are you looking for a way to promote your business or events in an
            eco-friendly way? Aveyron-Connect offers a platform that allows you
            to reach a wider audience and connect with environmentally conscious
            individuals who share your values.
          </p>
          <ul>
            <li>
              <img src={marketing} alt="Visibility" className="pro-icon" />
              Increased visibility: reach a wider audience of environmentally
              conscious individuals who share your values.
            </li>
            <li>
              <img src={eco} alt="Eco-friendly" className="pro-icon" />
              Eco-friendly marketing: use our paperless marketing strategies to
              reduce your carbon footprint and attract like-minded customers.
            </li>

            <li>
              <img src={euro} alt="Euro" className="pro-icon" />
              Only €10 for a lifetime pro account: enjoy all the benefits of a
              pro account without any ongoing subscription costs.
            </li>
          </ul>
          <p>
            Sign up for a pro account on Aveyron-Connect today and start
            promoting your business or events to a community of environmentally
            conscious individuals.
          </p>
          <p>
            <b>
              Together, we can create a more sustainable future and make a
              positive impact on the environment.
            </b>
          </p>

          <div>
            <button
              className="add-btn"
              // onClick={handleOrganizeActivity}
              style={{ marginBottom: "50px" }}
            >
              Sign Up for a Pro Account
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/* <footer className="homepage-footer">
        <p>&copy; 2023 Aveyron Connect. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
