import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import { Dropdown, Button, ProgressBar } from "react-bootstrap";

import Comments from "./Comments";
import { getTask, updateTask, updateTaskWorkHours } from "../../actions/tasks";
import Input from "../../components/Auth/Input";

const initialData = { hoursToAdd: 0 };

const TaskDetails = () => {
  const { task, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [hoursData, setHoursData] = useState(initialData);
  const user = JSON.parse(localStorage.getItem("profile"));
  let result = 0;

  useEffect(() => {
    dispatch(getTask(id));
  }, [id, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const getNumberOfTotalHoursWorked = (hoursArray, newHours) => {
    result = 0;
    for (let i = 0; i < hoursArray.length; i++) {
      result = result + parseInt(hoursArray[i].split(":")[0]);
    }
    result = result + parseInt(newHours);
    return result;
  };

  const dispatchData = () => {
    const today = new Date();
    let month = today.getMonth();
    month++;
    month < 10 ? (month = `0${month}`) : (month = month.toString());
    const todayData = `${today.getDate()}-${month}-${today.getFullYear()}`;
    const hours = `${parseInt(hoursData.hoursToAdd)}:${todayData}`;
    const formData = { id: task._id, value: hours };
    dispatch(updateTaskWorkHours(formData));
    setHoursData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getNumberOfTotalHoursWorked(task.hours_worked, hoursData.hoursToAdd) < 0
      ? alert("Working hours cannot be negative")
      : dispatchData();
  };

  const handleChange = (e) => {
    setHoursData({ ...hoursData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <CircularProgress size="7em" />;
  }

  if (!task) return null;

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div>
        <Typography variant="h4">{task.id_project}</Typography>
        <br />
        <Typography variant="h5">{task.task_name}</Typography>
        <br />
        <Typography variant="h6">{task.task_description}</Typography>
        <br />
        <Typography variant="h6">
          <b>Assigned employee: </b>
          {task.id_user}
        </Typography>
        <Typography variant="h6">
          <b>Deadline:</b> {task.deadline.split("T")[0]}
        </Typography>
        <Typography variant="h6">
          <b>Hours worked:</b>{" "}
          {getNumberOfTotalHoursWorked(task?.hours_worked, 0)} hours
        </Typography>
        <Typography variant="h6">
          <b>Estimated time of task completion:</b> {task?.estimated_hours}{" "}
          hours
        </Typography>
        <Typography variant="h6">
          <b>Status:</b> {task.implementation_status}
        </Typography>
        <br />
        <ProgressBar
          animated
          now={
            (parseInt(getNumberOfTotalHoursWorked(task?.hours_worked, 0)) /
              parseInt(task?.estimated_hours)) *
            100
          }
        />
        <br />

        {user.result.position === "user" ? (
          <>
            <Dropdown.Divider />
            <br />
            {task.implementation_status === "new" ? (
              <>
                Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  size="small"
                  variant="outline-success"
                  onClick={() => dispatch(updateTask(task._id, "in progress"))}
                >
                  Start Task
                </Button>
                <br />
              </>
            ) : task.implementation_status === "in progress" ? (
              <>
                Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  size="small"
                  variant="outline-success"
                  onClick={() => dispatch(updateTask(task._id, "done"))}
                >
                  Finish Task
                </Button>{" "}
                &nbsp;
                {task.hours_worked === 0 ? (
                  <Button
                    size="small"
                    variant="outline-secondary"
                    onClick={() => dispatch(updateTask(task._id, "new"))}
                  >
                    I haven't started task yet
                  </Button>
                ) : (
                  <br />
                )}
              </>
            ) : task.implementation_status === "done" ? (
              <>
                Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  size="small"
                  variant="outline-secondary"
                  onClick={() => dispatch(updateTask(task._id, "in progress"))}
                >
                  I haven't finished task yet
                </Button>
                <br />
              </>
            ) : task.implementation_status === "archived" ? (
              <>
                The task has been archived, you cannot change its status.
                <br />
              </>
            ) : (
              <>
                There is a problem with reading the status.
                <br />
              </>
            )}
            {task.implementation_status === "in progress" ? (
              <>
                <br />
                <Dropdown.Divider />
                <br />
                <form onSubmit={handleSubmit}>
                  <Typography variant="body1">
                    {"Add to the time worked on this task:"}
                  </Typography>
                  <br />
                  <Input
                    size="small"
                    type="number"
                    name="hoursToAdd"
                    handleChange={handleChange}
                    value={hoursData?.hoursToAdd}
                  ></Input>
                  <br />
                  <br />
                  <Button variant="success" type="submit" className="float-end">
                    Add
                  </Button>
                  <br />
                  <br />
                </form>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {task.implementation_status === "done" ||
        task.implementation_status === "new" ? (
          <></>
        ) : (
          <>
            <Dropdown.Divider />
            <br />
            <Comments task={task} />
          </>
        )}
      </div>
    </Paper>
  );
};

export default TaskDetails;
