import React, { useState } from "react";
import { addActivityToRoutine } from "../api";

const AddActivityForm = ({ allActivities, routineToRender }) => {
  const [formState, setFormState] = useState({
    activityId: 0,
    count: 0,
    duration: 0,
  });
  return (
    <form
    className="addActivity"
    onSubmit={async (e) => {
      e.preventDefault();
      const addActivity = await addActivityToRoutine(
        localStorage.getItem("token"),
        routineToRender.id,
        formState.activityId,
        formState.count,
        formState.duration
      );
    }}
    >
      <div>
        Activity:
        <select 
        name="activity" 
        id="idkwhatthisis"
        value={formState.activity}
        onChange={(e) => {
            setFormState({ ...formState, activityId: e.target.value });
          }}
        >
            <option>--Select an activity--</option>
          {allActivities.map((activity, i) => {
            return <option key={`activityadd${i}`} value={activity.id}>{activity.name}</option>;
          })}
        </select>
      </div>
      <div>
        Count:
        <input
          type="number"
          value={formState.count}
          min="1"
          required
          placeholder="count"
          onChange={(e) => {
            setFormState({ ...formState, count: e.target.value });
          }}
        ></input>
      </div>
      <div>
        <div>
          Duration:
          <input
            type="number"
            value={formState.duration}
            min="1"
            required
            onChange={(e) => {
              setFormState({ ...formState, duration: e.target.value });
            }}
          ></input>
          minutes
        </div>
        <button className="addActivityButton" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddActivityForm;
