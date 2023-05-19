// import { activities } from "../Data/activities";
import "./ActivitesSearch.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useActivities from "../Data/AllActivities";

import React, { useState } from "react";

export default function ActivitiesSearch() {
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  const allActivities = useActivities();

  const now = new Date().getTime(); // get the current time

  // const upcomingActivities = allActivities.filter(
  //   (act) => new Date(act.date).getTime() >= now
  // );

  const upcomingActivities = allActivities
    .filter((act) => new Date(act.date).getTime() >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const activitiesFilteredList = upcomingActivities.filter(
    (act) =>
      act.name.toLowerCase().includes(searchName.toLowerCase()) &&
      act.city.toLowerCase().includes(searchCity.toLowerCase()) &&
      act.date.includes(searchDate)
  );

  return (
    <div className="activity-page">
      <h1>Sorties</h1>
      <div className="search-container">
        <div className="input-combined">
          <label>
            <span>Quoi</span>
            <input
              type="text"
              placeholder="Nom"
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
              value={searchName}
            />
          </label>
          <label>
            <span>Où</span>
            <input
              type="text"
              placeholder="Ville"
              onChange={(e) => {
                setSearchCity(e.target.value);
              }}
              value={searchCity}
            />
          </label>
          <label>
            <span>Quand</span>
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
            Effacer la recherche
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
                  <p>{act.description.slice(0, 50) + "....."}</p>
                  <p>
                    <b>Ville:</b>
                    {act.city}
                  </p>
                  {/* <p>
                    <b>Adresse:</b>
                    {act.address}
                  </p> */}
                  <p>
                    <b>Date:</b>
                    {act.date}
                  </p>
                  <button
                    className="more-info-btn"
                    onClick={() => {
                      navigate(`/activity/${act.id}`);
                    }}
                  >
                    Plus d'options
                  </button>
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
              <div className="not-loggedin">
                <p>Désolé, rien trouvé</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
