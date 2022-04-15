import React, { useState, useEffect } from "react";
import EditActivitiesForm from "./EditActivitiesForm";
import { getActivities } from "../api";
import ActivityForm from "./ActivitiesForm";

const Activities = () => {
  const [allActivities, setAllActivities] = useState([]);
  const [newActivityWanted, setNewActivityWanted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActivities();

        setAllActivities(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
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
                <hr></hr>
                {newActivityWanted ? (
                  <EditActivitiesForm
                    allActivities={allActivities}
                    setAllActivities={setAllActivities}
                    setNewActivityWanted={setNewActivityWanted}
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
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Activities;
