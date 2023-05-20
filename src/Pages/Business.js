import { Stores } from "../Data/Stores";
import React, { useState } from "react";
import "./EventsSearch.css";
import "./Business.css";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

export default function Business() {
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");
  // const [searchStoreName, setSearchStoreName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const StoresFilteredList = Stores.filter(
    (Store) =>
      Store.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      Store.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  // console.log(StoresFilteredList);
  return (
    <div className="event-container">
      <h1>Nos Meilleures Adresses</h1>
      <div className="search-container business-search-container">
        <div className="input-combined input-business">
          <label>
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
            {/* <span>Catégories</span> */}

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
              <option value="manger">où manger</option>
              <option value="dormir">où dormir</option>
              <option value="entreprise">entreprises</option>
              <option value="education">services</option>
            </select>
          </label>
        </div>
        <div className="input-buttons clear-business-search">
          <span
            onClick={() => {
              setSearchCity("");
              // setSearchStoreName("");
              setSearchCategory("");
            }}
          >
            Effacer la recherche
          </span>
        </div>
      </div>
      <div>
        <AnimatePresence>
          {StoresFilteredList.length > 0 ? (
            StoresFilteredList.map((Store) => {
              return (
                <motion.div
                  key={Store.storeID}
                  className="event-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="store-image">
                    <img src={Store.photos[0]} alt={Store.name} />
                  </div>
                  <div className="event-details">
                    <p>
                      <h3>{Store.name}</h3>
                    </p>
                    <p>
                      <b>Type: </b>
                      {Store.type}
                    </p>
                    <p>
                      <b>Description: </b>
                      {Store.description.slice(0, 70) + "..."}
                    </p>
                    <p>
                      <b>City: </b>
                      {Store.city}
                    </p>
                    <p>
                      <b>Speciality: </b>
                      {Store.speciality}
                    </p>
                    <button
                      onClick={() => {
                        navigate(`/store/${Store.storeID}`);
                      }}
                      className="more-info-btn"
                    >
                      Plus d'options
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                minHeight: "500px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p>Rien trouvé, mais nous ajouterons bientôt d'autres adresses</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
