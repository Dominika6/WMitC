import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { sortProjectTasksCoordinatorEmailByStatus } from "../../actions/tasks";
import TasksGetCoordinator from "./TasksGetCoordinator";

const TasksHomeCoordinator = () => {
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortProjectTasksCoordinatorEmailByStatus(user?.result?.email));
  }, [currentId, dispatch, user?.result?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  return <TasksGetCoordinator key="test" setCurrentId={setCurrentId} />;
};

export default TasksHomeCoordinator;
