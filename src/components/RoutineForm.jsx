import React, { useState } from "react";
import { createRoutine } from "../api";

const RoutineForm = ({
  token,
  setNewRoutineWanted,
  allRoutines,
  setAllRoutines,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });
  return (
    <>
      <form
        className="createRoutine"
        onSubmit={async (e) => {
          e.preventDefault();
          const createNewRoutine = await createRoutine(
            formState.name,
            formState.goal,
            formState.isPublic,
            token
          );
          setAllRoutines([...allRoutines, createNewRoutine]);
          setNewRoutineWanted(false);
        }}
      >
        <div className="createName">Create A Post</div>
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
          className="goal"
          type="text"
          value={formState.goal}
          placeholder="goal"
          required
          onChange={(e) => {
            setFormState({ ...formState, goal: e.target.value });
          }}
        />
        <input 
        type="text" />
        <div>
          Is this a public routine?
          <input
            className="isPublic"
            type="checkbox"
            value={formState.isPublic}
            placeholder="isPublic"
            onChange={() => {
              setFormState({ ...formState, isPublic: !formState.isPublic });
            }}
          />
        </div>

        <button className="newRoutineButton" type="submit">
          Submit Routine
        </button>
      </form>
    </>
  );
};
export default RoutineForm;
