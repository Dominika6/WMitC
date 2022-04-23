import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

import { createTask } from "../../actions/tasks";
import { getAllUsers } from "../../actions/users";
import { getAllProjects } from "../../actions/projects";


const initialState = {
    project: '',
    id_user: '',
    name: '',
    description: '',
    task_comments: [],
    deadline: new Date(),
    implementation_status: 'new'
}

// TODO informacja, że task został utworzony

const CreateTask = () => {
    const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [currentId] = useState(0);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const myTeam = [];
    const myClientsProjects = [];
    const { users, isLoading } = useSelector((state) => state.users);
    const { projects, isProjectLoading } = useSelector((state) => state.projects);

    useEffect(() => {
        dispatch(getAllUsers()).then(dispatch(getAllProjects()))
    }, [currentId, dispatch]);

    isLoading === false ?
        users.map((user) => ( user?.id_supervisor === loggedUser?.result?.email ) ? (
            myTeam.push(user)
        ) : (<></>))
        : (console.log())

    const isMyClient = true;
    //TODO sprawdzanie czy dany klient jest przypisany do danego koordynatora

    isProjectLoading === false ?
        projects.map((project) => ( isMyClient ) ? (
            myClientsProjects.push(project)
        ) : (<></>))
        : (console.log())

    //todo - coś zamiast powyższego console.loga

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData, history);
        dispatch(createTask(formData, history));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs">
            <br/><br/>
            <Typography variant="h4">{ ' Create Task ' }</Typography><br/>
            <form onSubmit={handleSubmit}>
                {/* TODO wybranie deadlinu */}

                <Typography variant="h6">{ 'Project' }</Typography>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Control as="select" name="project" onChange={handleChange}>
                        { myClientsProjects.map((project) => ( <option value={project?.project_name} key={project?.project_name} >{project?.project_name} ({project?.id_client})</option> )) }
                    </Form.Control>
                </Form.Group><br/>

                <Typography variant="h6">{ 'Title' }</Typography>
                <InputGroup>
                    <FormControl as="textarea" aria-label="Title" name="name" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography variant="h6">{ 'Description' }</Typography>
                <InputGroup>
                    <FormControl as="textarea" aria-label="Description" name="description" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography variant="h6">{ 'User' }</Typography>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Control as="select" name="id_user" onChange={handleChange}>
                        { myTeam.map((user) => ( <option value={user?.email} key={user?.email} >{user?.name}</option> )) }
                    </Form.Control>
                </Form.Group><br/>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="success" >Create Task</Button>
                </div>
            </form>
        </Container>
    )
}

export default CreateTask;
