import React, { useState } from "react";
import { createActivity } from "../api";

const ActivityForm = ({
  setNewActivityWanted,
  allActivities,
  setAllActivities,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });
  return (
    <>
      <form
        className="createactivity"
        onSubmit={async (e) => {
          e.preventDefault();
          const newActivity = await createActivity(
            formState.name,
            formState.description
          );
          setAllActivities([...allActivities, newActivity]);
          setNewActivityWanted(false);
        }}
      >
        <div className="createName">Create an activity</div>
        <input
          className="name"
          type="text"
          value={formState.name}
          placeholder="name"
          required
          onChange={(e) => {
            setFormState({ ...formState, name: e.target.value });
          }}
        />
        <input
          className="description"
          type="text"
          value={formState.description}
          placeholder="description"
          required
          onChange={(e) => {
            setFormState({ ...formState, description: e.target.value });
          }}
        />
        <input type="text" />

        <button className="newActivityButton" type="submit">
          Submit activity
        </button>
      </form>
    </>
  );
};

export default ActivityForm;
