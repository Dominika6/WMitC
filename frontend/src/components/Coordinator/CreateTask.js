import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

import { createTask } from "../../actions/tasks";
import { getTeamBySearch } from "../../actions/users";
import { getMyClientsProjects } from "../../actions/projects";

const initialState = {
  project: "",
  id_user: "",
  name: "",
  description: "",
  task_comments: [],
  deadline: "",
  implementation_status: "new",
  estimated_hours: 0,
  hours_worked: [],
};

const CreateTask = () => {
  const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, isLoading } = useSelector((state) => state.users);
  const { projects, isProjectLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getMyClientsProjects(loggedUser.result.email));
  }, [currentId, dispatch, loggedUser.result.email]);

  useEffect(() => {
    dispatch(getTeamBySearch(loggedUser.result.email));
  }, [currentId, dispatch, loggedUser.result.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.project === "") {
      formData.project = projects[0]?.project_name;
    }
    if (formData.id_user === "") {
      formData.id_user = users[0]?.email;
    }
    const today = new Date();
    let month = today.getMonth();
    month < 10 ? (month = `0${month}`) : (month = month.toString());
    const todayData = `${today.getDate()}-${month}-${today.getFullYear()}`;
    formData.hours_worked.push(`0:${todayData}`);
    dispatch(createTask(formData, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!users.length && !isLoading && !isProjectLoading)
    return "You must have a team and create a project to continue.";

  return (
    <Container component="main" maxWidth="xs">
      <br />
      <br />
      <Typography variant="h4">{" Create Task "}</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">{"Project"}</Typography>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Control as="select" name="project" onChange={handleChange}>
            {projects?.map((project) => (
              <option value={project?.project_name} key={project?.project_name}>
                {project?.project_name} ({project?.id_client})
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />

        <Typography variant="h6">{"Title"}</Typography>
        <InputGroup>
          <FormControl
            as="textarea"
            aria-label="Title"
            name="name"
            onChange={handleChange}
          />
        </InputGroup>
        <br />

        <Typography variant="h6">{"Description"}</Typography>
        <InputGroup>
          <FormControl
            as="textarea"
            aria-label="Description"
            name="description"
            onChange={handleChange}
          />
        </InputGroup>
        <br />

        <Typography variant="h6">{"User"}</Typography>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Control as="select" name="id_user" onChange={handleChange}>
            {users?.map((user) => (
              <option value={user?.email} key={user?.email}>
                {user?.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />

        <Typography variant="h6">
          {"Estimated time of task completion"}
        </Typography>
        <InputGroup>
          <Form.Group controlId="dob">
            <Form.Control
              type="number"
              min="0"
              name="estimated_hours"
              onChange={handleChange}
            />
          </Form.Group>
          <br />
        </InputGroup>
        <br />

        <Typography variant="h6">{"Deadline"}</Typography>
        <InputGroup>
          <Form.Group controlId="dob">
            <Form.Control type="date" name="deadline" onChange={handleChange} />
          </Form.Group>
          <br />
        </InputGroup>
        <br />

        <div className="d-grid gap-2">
          <Button type="submit" variant="success">
            Create Task
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateTask;
