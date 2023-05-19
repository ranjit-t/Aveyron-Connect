import React from "react";
import { useParams } from "react-router-dom";
import { Stores } from "../Data/Stores";
import "./SingleEvent.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SingleBusiness() {
  const { id } = useParams();
  const Store = Stores.filter((Store) => Store.storeID === id)[0];
  return (
    <div className="single-event-page">
      <h1>{Store.name}</h1>
      <div>
        <Carousel
          showThumbs={true}
          showStatus={false}
          interval={2000}
          autoPlay={true}
          infiniteLoop={true}
          swipeable={true} // enable swiping
          swipeScrollTolerance={10} // set minimum scroll amount
          className="event-gallery"
        >
          <div>
            <img
              src={Store.photos[0]}
              alt={Store.name}
              className="slider-image"
            />
          </div>
          <div>
            <img
              src={Store.photos[1]}
              alt={Store.name}
              className="slider-image"
            />
          </div>
          <div>
            <img
              src={Store.photos[2]}
              alt={Store.name}
              className="slider-image"
            />
          </div>
        </Carousel>
        <div className="event-details">
          {/* <p>
            <b>Name: </b>
            {Store.name}
          </p> */}
          <p>
            <b>Type: </b>
            {Store.type}
          </p>
          <p>
            <b>Description: </b>
            {Store.description}
          </p>
          <p>
            <b>City: </b>
            {Store.city}
          </p>
          <div className="timing-menu">
            <div>
              <p>
                <b>Timings </b>
              </p>
              <p>
                <b>Lundi: </b>
                {Store.lundi}
              </p>
              <p>
                <b>Mardi: </b>
                {Store.mardi}
              </p>
              <p>
                <b>Mercredi: </b>
                {Store.mercredi}
              </p>
              <p>
                <b>Jeudi: </b>
                {Store.jeudi}
              </p>
              <p>
                <b>Vendredi: </b>
                {Store.vendredi}
              </p>
              <p>
                <b>Samedi: </b>
                {Store.samedi}
              </p>
              <p>
                <b>Dimanche: </b>
                {Store.dimanche}
              </p>
            </div>
            <div>
              <img
                src={Store.menuPhoto}
                alt="Menu"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
