import React, { useState, useEffect } from "react";
import { getUserRoutines } from "../api";
import RoutineForm from "./RoutineForm";
import SingleRoutine from "./SingleRoutine";

const UserRoutines = ({ token, username, allRoutines, setAllRoutines }) => {
  const [userRoutines, setUserRoutines] = useState([]);

  const [newRoutineWanted, setNewRoutineWanted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRoutines(token, username);
        setUserRoutines(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token, username]);

  return (
    <div>
      {newRoutineWanted ? (
        <RoutineForm
          setNewRoutineWanted={setNewRoutineWanted}
          token={token}
          allRoutines={allRoutines}
          setAllRoutines={setAllRoutines}
        />
      ) : (
        <button
          className="newPostButton"
          onClick={() => {
            setNewRoutineWanted(true);
          }}
        >
          Create Routine
        </button>
      )}

      {userRoutines && userRoutines.length ? (
        userRoutines.map((routine, i) => {
          return (
            <>
              <div key={`userRoutine${i}`} className="userRoutine">
                <SingleRoutine
                  allRoutines={allRoutines}
                  routine={routine}
                  username={username}
                  setAllRoutines={setAllRoutines}
                  token={token}
                  setUserRoutines={setUserRoutines}
                  userRoutines={userRoutines}
                />
              </div>
            </>
          );
        })
      ) : (
        <div>Looks like you haven't made any routines...</div>
      )}
    </div>
  );
};

export default UserRoutines;

/* 
{msgBox.yes ? (
              msgBox.idx == i ? (
                <Message post={post} setMsgBox={setMsgBox} />
              ) : (
                <button
                  className="msgButton1"
                  onClick={() => {
                    setMsgBox({ ...msgBox, idx: i });
                  }}
                >
                  Send Message
                </button>
              )
            ) : (
              <button
                className="msgButton2"
                onClick={() => {
                  setMsgBox({ ...msgBox, idx: i });
                }}
              >
                Create Message
              </button>
            )}
*/
