import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import { Dropdown, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";

import { workSummary } from "../../actions/tasks";

const WorkSummary = () => {
  const [currentId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { tasks, archived_tasks, isLoading } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(workSummary(user?.result?.email));
  }, [currentId, dispatch, user.result.email]);
  if (!tasks.length && !isLoading) return "No summary";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h4">Current Tasks </Typography>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project</th>
            <th>Worker</th>
            <th>Estimated Hours</th>
            <th>Worked Hours</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <>
              {index === 0 ? (
                <></>
              ) : (
                <tr>
                  <td>{task[0]}</td>
                  <td>{task[1]}</td>
                  <td>{task[2]}</td>
                  <td>{task[3]}</td>
                  <td>{task[4]}</td>
                  <td>{task[5]}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
      <CSVLink data={tasks} target="_blank">
        Download a summary of your team's work
      </CSVLink>
      <br />
      <br />
      <br />
      <Dropdown.Divider />
      <br />
      <br />
      <Typography variant="h4">Archived Tasks </Typography>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project</th>
            <th>Worker</th>
            <th>Estimated Hours</th>
            <th>Worked Hours</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {archived_tasks.map((task, index) => (
            <>
              {index === 0 ? (
                <></>
              ) : (
                <tr>
                  <td>{task[0]}</td>
                  <td>{task[1]}</td>
                  <td>{task[2]}</td>
                  <td>{task[3]}</td>
                  <td>{task[4]}</td>
                  <td>{task[5]}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
      <CSVLink data={archived_tasks} target="_blank">
        Download a summary of your team's archived work
      </CSVLink>
      <br />
      <br />
    </>
  );
};

export default WorkSummary;
