import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Dropdown, Form, Table } from "react-bootstrap";

import { getTeamBySearch } from "../../actions/users";
import { getTeamSummaryTable, getUserSummaryTable } from "../../actions/tasks";
import { CSVLink } from "react-csv";

const initialState = { user_email: "" };

const UsersSummary = () => {
  const loggedUser = JSON.parse(localStorage.getItem("profile"));
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const [currentId] = useState(0);
  const { users, isLoading } = useSelector((state) => state.users);
  const { team_summary_table, user_summary_table } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(getTeamBySearch(loggedUser?.result?.email));
  }, [currentId, dispatch, loggedUser.result.email]);

  const handleUser = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUsersSummary = (e) => {
    e.preventDefault();
    if (formData.user_email === "all") {
      dispatch(getTeamSummaryTable(loggedUser.result.email));
    }
    if (formData.user_email !== "" && formData.user_email !== "all") {
      dispatch(getUserSummaryTable(formData.user_email));
    }
  };

  if (!users.length && !isLoading) return "You have no users assigned";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Container component="main">
        <Form onSubmit={getUsersSummary}>
          <Typography variant="h4"> Employee Work Summary</Typography>
          <br />
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Control as="select" name="user_email" onChange={handleUser}>
              <option value="">Choose worker</option>
              {users.map((user) => (
                <option value={user.email} key={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
              <option value="all">Summary of the entire team</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit" className="float-end">
            Get summary
          </Button>{" "}
          <br />
          <br />
        </Form>
      </Container>
      <br />
      {formData.user_email === "all" && team_summary_table ? (
        <>
          <Container component="main">
            <Dropdown.Divider />
            <br />
            <br />
            <Typography variant="h4">Summary for your team</Typography>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Worker email</th>
                  <th>Current month [h]</th>
                  <th>Last month [h]</th>
                  <th>Total [h]</th>
                </tr>
              </thead>
              <tbody>
                {team_summary_table.map((user, index) => (
                  <>
                    {index === 0 ? (
                      <></>
                    ) : (
                      <tr>
                        <td>{user[0]}</td>
                        <td>{user[1]}</td>
                        <td>{user[2]}</td>
                        <td>{user[3]}</td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </Table>
            <br />
            <CSVLink
              data={team_summary_table}
              target="_blank"
              filename={"team_summary"}
            >
              Download a summary of hours worked by your team
            </CSVLink>
            <br />
          </Container>
        </>
      ) : (
        <></>
      )}
      {formData.user_email !== "all" &&
      formData.user_email !== "" &&
      user_summary_table ? (
        <>
          <Container component="main">
            {" "}
            <Dropdown.Divider />
            <br />
            <br />
            <Typography variant="h4">
              Summary for {formData.user_email}
            </Typography>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project name</th>
                  <th>Current month [h]</th>
                  <th>Last month [h]</th>
                  <th>Total [h]</th>
                </tr>
              </thead>
              <tbody>
                {user_summary_table.map((project, index) => (
                  <>
                    {index === 0 ? (
                      <></>
                    ) : (
                      <tr>
                        <td>{project[0]}</td>
                        <td>{project[1]}</td>
                        <td>{project[2]}</td>
                        <td>{project[3]}</td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </Table>
            <br />
            <CSVLink
              data={user_summary_table}
              target="_blank"
              filename={formData.user_email}
            >
              Download a summary of hours worked by {formData.user_email}
            </CSVLink>
            <br />
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UsersSummary;
