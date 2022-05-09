import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTasksBySearch } from "../../actions/tasks";
import GetMyTasks from "./GetMyTasks";

const WorkerHome = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    dispatch(getTasksBySearch(user?.result?.email));
  }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h3>Your tasks</h3>
      <br />
      <GetMyTasks setCurrentId={setCurrentId} />
    </>
  );
};

export default WorkerHome;
