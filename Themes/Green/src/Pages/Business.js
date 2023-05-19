import { events } from "../Data/events";
import React, { useState } from "react";
import "./EventsSearch.css";
import "./Business.css";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

export default function Business() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  const [searchEventName, setSearchEventName] = useState("");
  const [searchEventDate, setSearchEventDate] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const eventsFilteredList = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchEventName.toLowerCase()) &&
      event.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      event.date.includes(searchEventDate)
  );

  return (
    <div className="event-container">
      <h1>Nos Meilleures Adresses</h1>
      <div className="search-container">
        <div className="input-combined">
          <label>
            {/* <span>Qoui</span> */}
            <input
              type="text"
              placeholder="Nom"
              onChange={(e) => {
                setSearchEventName(e.target.value);
              }}
              value={searchEventName}
            />
          </label>
          <label>
            {/* <span>Ou</span> */}
            <input
              type="text"
              placeholder="Ville"
              onChange={(e) => {
                setSearchCity(e.target.value);
              }}
              value={searchCity}
            />
          </label>
        </div>
        <div className="input-selectOption">
          <label>
            <span>Category</span>

            <select
              name="category"
              id="category"
              onChange={(e) => {
                setSearchCategory(e.target.value);
                console.log(searchCategory);
              }}
              value={searchCategory}
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="manger">à manger</option>
              <option value="dormir">à dormir</option>
              <option value="entreprise">entreprise</option>
              <option value="education">education</option>
              {/* <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option> */}
            </select>
          </label>
        </div>
        <div className="input-buttons">
          <span
            onClick={() => {
              setSearchCity("");
              setSearchEventName("");
              setSearchEventDate("");
              setSearchCategory("");
            }}
          >
            Clear
          </span>
        </div>
      </div>
      <div>
        <AnimatePresence>
          {eventsFilteredList.length > 0 ? (
            eventsFilteredList.map((event) => {
              return (
                // <div className="event-wrapper" key={event.event_id}>
                <motion.div
                  key={event.event_id}
                  className="event-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="store-image">
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
                        navigate(`/store/${event.event_id}`);
                      }}
                      className="more-info-btn"
                    >
                      More Info
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              // className="event-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <p>Nothing Found</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
