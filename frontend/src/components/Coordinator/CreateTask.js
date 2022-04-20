import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import Input from "../Auth/Input";
import { createTask } from "../../actions/tasks";
import { getAllUsers } from "../../actions/users";


const initialState = {
    project: 'Project1',
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
    const { users, isLoading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [currentId, dispatch]);

    isLoading === false ?
        users.map((user) => ( user?.id_supervisor === loggedUser?.result?.email ) ? (
            myTeam.push(user)
        ) : (<></>))
        : (console.log())

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(createTask(formData, history));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{ 'Create Task' }</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* TODO wybranie projektu i deadlinu */}
                        <Input name="name" label="Task Name" handleChange={handleChange} autoFocus half />
                        <Input name="description" label="Task description" handleChange={handleChange} half />
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicSelect">
                                <Form.Label>
                                    Choose User
                                </Form.Label>
                                <Form.Control as="select" name="id_user" onChange={handleChange}>
                                    { myTeam.map((user) => ( <option value={user?.email} key={user?.email} >{user?.name}</option> )) }
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Grid>
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="success" >Create Task</Button>
                    </div>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateTask;
