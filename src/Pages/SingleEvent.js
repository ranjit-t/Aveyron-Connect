import React from "react";
import { useParams } from "react-router-dom";
import { events } from "../Data/events";
import "./SingleEvent.css";

export default function SingleEvent() {
  const { id } = useParams();
  const event = events.filter((event) => event.event_id === id)[0];
  return (
    <div className="event-section">
      <h1>Event</h1>
      <div>
        <div className="event-gallery">
          <img src={event.photos[0]} alt={event.name} />
          <img src={event.photos[1]} alt={event.name} />

          <img src={event.photos[2]} alt={event.name} />
        </div>
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
