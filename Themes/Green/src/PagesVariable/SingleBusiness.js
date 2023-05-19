import React from "react";
import { useParams } from "react-router-dom";
import { events } from "../Data/events";
import "./SingleEvent.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SingleBusiness() {
  const { id } = useParams();
  const event = events.filter((event) => event.event_id === id)[0];
  return (
    <div className="single-event-page">
      <h1>Business</h1>
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
              src={event.photos[0]}
              alt={event.name}
              className="slider-image"
            />
          </div>
          <div>
            <img
              src={event.photos[1]}
              alt={event.name}
              className="slider-image"
            />
          </div>
          <div>
            <img
              src={event.photos[2]}
              alt={event.name}
              className="slider-image"
            />
          </div>
        </Carousel>
        <div className="event-details">
          <p>
            <b>Name: </b>
            {event.name}
          </p>
          <p>
            <b>Type: </b>
            {event.type}
          </p>
          <p>
            <b>Description: </b>
            {event.description}
          </p>
          <p>
            <b>City: </b>
            {event.city}
          </p>
          <p>
            <b>Date: </b>
            {event.date}
          </p>
          <p>
            <b>Timings: </b>
            {event.time}
          </p>
        </div>
      </div>
    </div>
  );
}
