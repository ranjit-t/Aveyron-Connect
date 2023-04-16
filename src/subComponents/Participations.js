import React from "react";
// import { activities } from "../Data/activities";
import { useNavigate } from "react-router-dom";
import useActivities from "../Data/AllActivities";
import { signedUser } from "../Firebase/config";
import bell from "../Images/notification-png.png";

import "./Participations.css";

export default function Participations() {
  const allActivities = useActivities();

  const filteredActivities = allActivities.filter((activity) => {
    const participants = activity.participants;
    return participants.some(
      (participant) => participant.email === signedUser.email
    );
  });
  //
  const navigate = useNavigate();

  const now = new Date().getTime(); // get the current time

  const pastActivities = filteredActivities.filter(
    (act) => new Date(act.date).getTime() < now
  );
  const upcomingActivities = filteredActivities.filter(
    (act) => new Date(act.date).getTime() >= now
  );

  return (
    <div className="my-activities-page">
      {upcomingActivities.length > 0 && (
        <div className="my-activities-list">
          <h3>Activités à venir</h3>
          {upcomingActivities.map((act, indx) => {
            return (
              <div key={indx} className="my-activities-map">
                <div
                  onClick={() => {
                    navigate(`/activity/${act.id}`);
                  }}
                >
                  <p className="participation-act-name">
                    <b>{act.name}</b>
                  </p>
                  <p>{act.date}</p>
                  <p>{act.city}</p>
                  <p className="notifications-partificapation">
                    <img src={bell} alt="Comments" width="50px" />
                    <span>{act.comments.length}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pastActivities.length > 0 && (
        <div className="my-activities-list">
          <h3>Activités passées</h3>
          {pastActivities.map((act, indx) => {
            return (
              <div
                key={indx * indx}
                className="my-activities-map past-activities"
              >
                <div>
                  <p>
                    <b>{act.name}</b>
                  </p>
                  <p>{act.date}</p>
                  <p>{act.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {upcomingActivities.length === 0 && pastActivities.length === 0 && (
        <p>Vous n'avez participé à rien jusqu'à présent</p>
      )}
    </div>
  );
}
