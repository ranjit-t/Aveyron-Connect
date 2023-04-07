import React, { useState } from "react";
import "./AddEvent.css";

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [timings, setTimings] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();
    console.log(photo1, photo2, photo3);
    // TODO: Implement logic to add event to database
  };

  return (
    <div className="add-event-page">
      <h1>Add Event</h1>
      <form onSubmit={handleAddEvent}>
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="timings">Timings:</label>
        <input
          type="text"
          id="timings"
          value={timings}
          onChange={(e) => setTimings(e.target.value)}
          required
        />

        <label htmlFor="shortDescription">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="eventType">Event Type:</label>
        <select
          id="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        >
          <option value="" className="event-type-option">
            --Event Type--
          </option>
          <option value="concert" className="event-type-option">
            Concert
          </option>
          <option value="standup" className="event-type-option">
            Standup Comedy
          </option>
          <option value="theatre" className="event-type-option">
            Theatre
          </option>
          <option value="dance" className="event-type-option">
            Dance Show
          </option>
          <option value="music" className="event-type-option">
            Music Performance
          </option>
          <option value="exhibition" className="event-type-option">
            Exhibition
          </option>
          <option value="gallery" className="event-type-option">
            Art Gallery
          </option>
          <option value="other" className="event-type-option">
            Other
          </option>
        </select>

        <label htmlFor="photo1">Photo 1:</label>
        <input
          type="file"
          className="myFileInput"
          id="photo1"
          //   value={photo1}
          onChange={(e) => setPhoto1(e.target.files[0])}
          required
        />

        <label htmlFor="photo2">Photo 2:</label>
        <input
          type="file"
          className="myFileInput"
          id="photo2"
          //   value={photo2}
          onChange={(e) => setPhoto2(e.target.files[0])}
        />

        <label htmlFor="photo3">Photo 3:</label>
        <input
          type="file"
          className="myFileInput"
          id="photo3"
          //   value={photo3}
          onChange={(e) => setPhoto3(e.target.files[0])}
        />

        <label htmlFor="contactEmail">Organizer Email:</label>
        <input
          type="email"
          id="contactEmail"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />

        <label htmlFor="contactPhone">Organizer Phone Number:</label>
        <input
          type="tel"
          id="contactPhone"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          required
        />

        <label htmlFor="isFree">Is it Free?</label>
        <div className="price-free">
          <input
            type="radio"
            id="isFree"
            name="isFree"
            value="yes"
            checked={isFree}
            onChange={() => setIsFree(true)}
          />
          <label htmlFor="isFree">Yes</label>

          <input
            type="radio"
            id="notFree"
            name="isFree"
            value="no"
            checked={!isFree}
            onChange={() => setIsFree(false)}
          />
          <label htmlFor="notFree">No</label>
        </div>

        {!isFree && (
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
