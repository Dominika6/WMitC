import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { ButtonBase, Card, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Container, ProgressBar, Button } from "react-bootstrap";

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
      window.location.reload();
    } else {
      console.log("Task has not been archived.");
    }
  };
  //todo jednakowa długość progressbara
  return (
    <>
      <br />
      <Card raised elevation={6}>
        <Container>
          <ButtonBase onClick={openTask} component="span" name="test">
            <div>
              <br />
              <Typography>
                <b>{task?.task_name}</b>
              </Typography>
              <br />
              <Typography>{task?.id_user}</Typography>
              <Typography>
                {task?.deadline ? task?.deadline.split("T")[0] : <></>}
              </Typography>
              <Typography>
                <b>Status:</b> {task?.implementation_status}
              </Typography>
              <ProgressBar
                animated
                now={
                  (parseInt(task?.hours_worked) /
                    parseInt(task?.estimated_hours)) *
                  100
                }
              />
            </div>
          </ButtonBase>

          {user && user?.result.position === "manager" ? (
            <>
              <br />
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
        </Container>
      </Card>
    </>
  );
};

export default TaskCoordinator;
