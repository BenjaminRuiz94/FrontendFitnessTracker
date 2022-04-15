import React, { useState } from "react";

import { updateRoutine } from "../api";

const EditRoutineForm = ({
  setEditRoutineWanted,
  token,
  routineToRender,
  setUserRoutines,
  userRoutines,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });

  return (
    <form
      className="updateRoutine"
      onSubmit={async (e) => {
        e.preventDefault();
        const updatedRoutine = await updateRoutine(
          token,
          routineToRender.id,
          formState.name,
          formState.goal,
          formState.isPublic
        );
        const updatedRoutines = userRoutines.map((routine) => {
          if (routine.id === updatedRoutine.id) {
            return updatedRoutine;
          } else {
            return routine;
          }
        });
        setUserRoutines(updatedRoutines);
        setEditRoutineWanted(false);
      }}
    >
      <div className="createName">Update your routines!</div>
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
        className="goal"
        type="text"
        value={formState.goal}
        placeholder="goal"
        onChange={(e) => {
          setFormState({ ...formState, goal: e.target.value });
        }}
      />
      <div>
        {" "}
        Is this a public routine?
        <input
          className="isPublic"
          type="checkbox"
          value={formState.isPublic}
          placeholder="isPublic"
          onChange={() => {
            setFormState({
              ...formState,
              isPublic: !formState.isPublic,
            });
          }}
        />
      </div>

      <button className="updateButton" type="submit">
        Update Routine
      </button>
    </form>
  );
};

export default EditRoutineForm;
