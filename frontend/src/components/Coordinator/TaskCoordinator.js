import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

import { archiveTask } from "../../actions/tasks";

const TaskCoordinator = ({ task }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const openTask = (e) => {
    e.preventDefault();
    history.push(`/task/${task._id}`);
  };

  const clickArchiveTask = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "You cannot undo this operation. Are you sure you want to archive this task?"
      )
    ) {
      dispatch(archiveTask(task._id));
    } else {
      console.log("Task has not been archived.");
    }
  };

  return (
    <>
      <br />
      <Card raised="true" elevation={6}>
        <Container>
          <div onClick={openTask}>
            <br />
            <b>{task?.task_name}</b>
            <br />
            {task?.id_user}
            <br />
            {task?.deadline ? task?.deadline.split("T")[0] : <></>}
            <br />
            <b>Status:</b> {task?.implementation_status}
          </div>
          {user && user?.result.position === "manager" ? (
            <>
              <Button
                variant="danger"
                type="submit"
                className="float-end"
                onClick={clickArchiveTask}
              >
                <DeleteIcon fontSize="small" /> &nbsp; Archive
              </Button>
              <br />
            </>
          ) : (
            <></>
          )}
          <br />
        </Container>
      </Card>
    </>
  );
};

export default TaskCoordinator;
