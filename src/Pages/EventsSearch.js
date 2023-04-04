import { events } from "../Data/events";
import React, { useState } from "react";
import "./EventsSearch.css";
import { useNavigate } from "react-router-dom";

export default function EventsSearch() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [searchEventName, setSearchEventName] = useState("");

  const eventsFilteredList = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchEventName.toLowerCase()) &&
      event.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="event-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Event"
          onChange={(e) => {
            setSearchEventName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Search City"
          onChange={(e) => {
            setSearchCity(e.target.value);
          }}
        />
      </div>
      <div>
        {eventsFilteredList.map((event) => {
          return (
            <div className="event-wrapper" key={event.event_id}>
              <div className="event-image">
                <img src={event.photos[0]} alt={event.name} />
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
                  {event.short_description}
                </p>
                <p>
                  <b>City: </b>
                  {event.city}
                </p>
                <p>
                  <b>Date: </b>
                  {event.date}
                </p>
                <button
                  onClick={() => {
                    navigate(`/event/${event.event_id}`);
                  }}
                  className="more-info-btn"
                >
                  More Info
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
