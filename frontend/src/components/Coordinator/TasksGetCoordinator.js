import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Divider } from "@material-ui/core";
import { Container } from "react-bootstrap";

import TaskCoordinator from "./TaskCoordinator";
import { getMyClientsProjects } from "../../actions/projects";

const TasksGetCoordinator = ({ setCurrentId }) => {
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyClientsProjects(loggedUser?.result.email));
  }, [dispatch, loggedUser.result.email]);

  function ifAllTasksAreArchived(task_group) {
    let result;
    for (let i = 0; i < task_group.length; i++) {
      task_group[i]?.implementation_status === "new" ||
      task_group[i]?.implementation_status === "in progress" ||
      task_group[i]?.implementation_status === "done"
        ? (result = false)
        : (result = true);
    }
    return result;
  }
  if (!tasks?.length && !isLoading) return "Your team has no tasks!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      {tasks?.map((tasks_group, index) => (
        <div key={index}>
          <br />
          {tasks_group[0]?.id_project && ifAllTasksAreArchived(tasks_group) ? (
            <Grid>
              <h3>{tasks_group[0].id_project}</h3>
              <p>All tasks in this project are archived.</p>
            </Grid>
          ) : tasks_group[0]?.id_project ? (
            <h3>{tasks_group[0].id_project}</h3>
          ) : (
            <Grid>
              <h3>{projects[index]?.project_name}</h3>
              <br />
              <p>There are no tasks defined in this project.</p>
            </Grid>
          )}
          {tasks_group.map((task, index) =>
            task.implementation_status === "archived" ? (
              <div key={task._id}></div>
            ) : (
              <TaskCoordinator
                key={index}
                task={task}
                setCurrentId={setCurrentId}
              />
            )
          )}
          <br />
          <Divider />
        </div>
      ))}
    </Container>
  );
};

export default TasksGetCoordinator;
