import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { Button, Container, Dropdown, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getClientsBySearch } from "../../actions/clients";
import { getClientSummaryTable } from "../../actions/tasks";
import { CSVLink } from "react-csv";

const initialState = { project: "", client_email: "" };

const ClientsSummary = () => {
  const [currentId] = useState(0);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const { clients, isLoading } = useSelector((state) => state.clients);
  const { client_summary_table } = useSelector((state) => state.tasks);
  const loggedUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getClientsBySearch(loggedUser?.result?.email));
  }, [currentId, dispatch, loggedUser.result.email]);

  const handleClient = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSummary = (e) => {
    e.preventDefault();
    if (formData.client_email !== "") {
      dispatch(getClientSummaryTable(formData.client_email));
    } else {
      console.log("Choose client first");
    }
  };

  if (!clients?.length && !isLoading) return "You have no clients!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Container component="main">
        <Form onSubmit={getSummary}>
          <Typography variant="h4"> Clients Summary</Typography>
          <br />
          <Form.Group className="mb-3" controlId="formBasicSelect">
            <Form.Control
              as="select"
              name="client_email"
              onChange={handleClient}
            >
              <option value="">Choose company</option>
              {clients.map((client) => (
                <option value={client.email} key={client.email}>
                  {client.name} ({client.email})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br />
          <Button variant="success" type="submit" className="float-end">
            Get summary
          </Button>{" "}
          <br />
        </Form>
      </Container>
      <br />
      {formData.client_email !== "" && client_summary_table ? (
        <>
          <Container component="main">
            <Dropdown.Divider />
            <br />
            <br />
            <Typography variant="h4">
              Summary for {formData.client_email}
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
                {client_summary_table.map((project, index) => (
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
            <CSVLink data={client_summary_table} target="_blank">
              Download a summary of the hours worked for the client
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
export default ClientsSummary;
