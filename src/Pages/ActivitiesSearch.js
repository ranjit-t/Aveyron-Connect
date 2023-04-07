import { activities } from "../Data/activities";
import "./ActivitesSearch.css";
import { motion, AnimatePresence } from "framer-motion";

import React, { useState } from "react";

export default function ActivitiesSearch() {
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const activitiesFilteredList = activities.filter(
    (act) =>
      act.name.toLowerCase().includes(searchName.toLowerCase()) &&
      act.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      act.date.includes(searchDate)
  );

  return (
    <div className="activity-page">
      <h1>Activities</h1>
      <div className="search-container">
        <div className="input-combined">
          <label>
            <span>What</span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
              value={searchName}
            />
          </label>
          <label>
            <span>Where</span>
            <input
              type="text"
              placeholder="City"
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
                setSearchDate(e.target.value);
              }}
              value={searchDate}
            />
          </label>
        </div>
        <div className="input-buttons">
          <span
            onClick={() => {
              setSearchCity("");
              setSearchName("");
              setSearchDate("");
            }}
          >
            Clear
          </span>
        </div>
      </div>
      <div className="activities-container">
        <AnimatePresence>
          {activitiesFilteredList.length > 0 ? (
            activitiesFilteredList.map((act) => {
              return (
                <motion.div
                  key={act.name}
                  className="activity-map"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p>
                    <b>{act.name}</b>
                  </p>
                  <p>{act.description}</p>
                  <p>
                    <b>City:</b>
                    {act.city}
                  </p>
                  <p>
                    <b>Address:</b>
                    {act.address}
                  </p>
                  <p>
                    <b>Date:</b>
                    {act.date}
                  </p>
                  <button className="more-info-btn">More Info</button>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              // className="activity-map"
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
