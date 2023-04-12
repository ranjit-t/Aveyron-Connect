import React from "react";
// import { activities } from "../Data/activities";
import { useNavigate } from "react-router-dom";
import useActivities from "../Data/AllActivities";
import { signedUser } from "../Firebase/config";

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
          <h3>Upcoming Activities</h3>
          {upcomingActivities.map((act, indx) => {
            return (
              <div key={indx} className="my-activities-map">
                <div
                  onClick={() => {
                    navigate(`/activity/${act.id}`);
                  }}
                >
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

      {pastActivities.length > 0 && (
        <div className="my-activities-list">
          <h3>Past Activities</h3>
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
        <p>You haven't participated in anything so far</p>
      )}
    </div>
  );
}
