import { events } from "../Data/events";
import React, { useState } from "react";
import "./EventsSearch.css";
import { useNavigate } from "react-router-dom";

export default function EventsSearch() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [searchEventName, setSearchEventName] = useState("");
  const [searchEventDate, setSearchEventDate] = useState("");

  const eventsFilteredList = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchEventName.toLowerCase()) &&
      event.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      event.date.includes(searchEventDate)
  );

  return (
    <div className="event-container">
      <div className="search-container">
        <div className="input-combined">
          <label>
            <span>What</span>
            <input
              type="text"
              placeholder="Event Name"
              onChange={(e) => {
                setSearchEventName(e.target.value);
              }}
              value={searchEventName}
            />
          </label>
          <label>
            <span>Where</span>
            <input
              type="text"
              placeholder="Event City"
              onChange={(e) => {
                setSearchCity(e.target.value);
              }}
              value={searchCity}
            />
          </label>
          <label>
            <span>When</span>
            <input
              className="date-input"
              type="date"
              placeholder=""
              onChange={(e) => {
                setSearchEventDate(e.target.value);
              }}
              value={searchEventDate}
            />
          </label>
        </div>
        <div className="input-buttons">
          {/* <span>Search</span> */}
          <span
            onClick={() => {
              setSearchCity("");
              setSearchEventName("");
              setSearchEventDate("");
            }}
          >
            Clear
          </span>
        </div>
        {/* <div className="clear-inputs">
          <p>clear</p>
        </div> */}
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
