import React, { useState } from "react";
import EditActivitiesForm from "./EditActivitiesForm";
import ActivityForm from "./ActivitiesForm";

const Activities = ({ token, allActivities, setAllActivities }) => {
  const [newActivityWanted, setNewActivityWanted] = useState(false);
  
  return (
    <div>
      <ActivityForm
        setNewActivityWanted={setNewActivityWanted}
        allActivities={allActivities}
        setAllActivities={setAllActivities}
      />
      {allActivities && allActivities.length
        ? allActivities.map((activity, i) => {
            //gotta map over the posts and return result to get all posts.
            return (
              <div key={`activity ${i}`} className="activity">
                <h1> {activity.name} </h1>
                <h2> {activity.description} </h2>
                
                {newActivityWanted ? (
                  <EditActivitiesForm
                    allActivities={allActivities}
                    setAllActivities={setAllActivities}
                    setNewActivityWanted={setNewActivityWanted}
                    activity={activity}
                    token={token}
                  />
                ) : (
                  <button
                    className="updateActivityButton"
                    onClick={() => {
                      setNewActivityWanted(true);
                    }}
                  >
                    Edit
                  </button>
                )}
                <hr></hr>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Activities;
