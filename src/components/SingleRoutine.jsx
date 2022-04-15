import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditRoutineForm from "./EditRoutineForm";
import AddActivityForm from "./AddActivityForm";
import { deleteRoutine } from "../api";

const SingleRoutine = ({
  allRoutines,
  routine,
  username,
  token,
  setAllRoutines,
  setUserRoutines,
  userRoutines,
  allActivities
}) => {
  const { singleRoutineId } = useParams();
  const [editRoutineWanted, setEditRoutineWanted] = useState(false);
  const [addActivity, setAddActivity] = useState(false);

  let routineToRender = null;

  if (singleRoutineId) {
    const singleRoutine = allRoutines.find(
      (element) => +singleRoutineId === +element.id
    );
    routineToRender = singleRoutine;
  } else {
    routineToRender = routine;
  }
  return (
    <>
      {routineToRender && routineToRender.id ? (
        <>
          {routineToRender.isPublic ? (
            <Link to={`/routines/${routineToRender.id}`}>
              <h1> {routineToRender.name} </h1>
            </Link>
          ) : (
            <h1>{routineToRender.name}</h1>
          )}

          <h2> {routineToRender.goal} </h2>
          <p> by {routineToRender.creatorName} </p>
          <ol>
            {routineToRender.activities && routineToRender.activities.length
              ? routineToRender.activities.map((activity, j) => {
                  return <li key={`activities${j}`}>{activity.name}</li>;
                })
              : null}
          </ol>
          <hr></hr>
          {routineToRender.creatorName === username ? (
            <div className="addActivityForm">
              {addActivity ? (
                <AddActivityForm
                allActivities={allActivities}
                routineToRender={routineToRender}
                />
              ) : (
                <button
                  className="addActivity"
                  onClick={() => {
                    setAddActivity(true);
                  }}
                >
                  Add Activity
                </button>
              )}

              <div className="editRoutine">
                {editRoutineWanted ? (
                  <EditRoutineForm
                    setEditRoutineWanted={setEditRoutineWanted}
                    token={token}
                    allRoutines={allRoutines}
                    setAllRoutines={setAllRoutines}
                    routineToRender={routineToRender}
                    setUserRoutines={setUserRoutines}
                    userRoutines={userRoutines}
                  />
                ) : (
                  <button
                    className="updateRoutineButton"
                    onClick={() => {
                      setEditRoutineWanted(true);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="deleteRoutineButton"
                  onClick={async () => {
                    deleteRoutine(token, routineToRender.id);
                  }}
                >
                  Delete
                </button>
                <hr></hr>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SingleRoutine;
