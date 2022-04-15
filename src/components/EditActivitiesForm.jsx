import React, { useState } from "react";
import { updateActivity } from "../api";

const EditActivitiesForm = ({
  allActivities,
  setAllActivities,
  setNewActivityWanted,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  return (
    <form
      className="updateActivity"
      onSubmit={async (e) => {
        e.preventDefault();
        const updatedActivity = await updateActivity(
          formState.id,
          formState.name,
          formState.description
        );

        const updatedActivities = allActivities.map((activity) => {
          if (activity.id === updatedActivity.id) {
            return updatedActivity;
          } else {
            return activity;
          }
        });
        setAllActivities([...allActivities, updatedActivities]);
        setNewActivityWanted(false);
      }}
    >
      <div className="ActivityUpdate">Update your activities!</div>
      <input
        className="name"
        type="text"
        value={formState.name}
        placeholder="name"
        onChange={(e) => {
          setFormState({ ...formState, name: e.target.value });
        }}
      />
      <input
        className="description"
        type="text"
        value={formState.description}
        placeholder="description"
        onChange={(e) => {
          setFormState({ ...formState, description: e.target.value });
        }}
      />

      <button className="updateActivityButton" type="submit">
        Update activity
      </button>
    </form>
  );
};

export default EditActivitiesForm;
