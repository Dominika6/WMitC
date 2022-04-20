import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Input from "../Auth/Input";
import { createTask } from "../../actions/tasks";


const initialState = {
    project: 'Project1',
    id_user: 'kasia@gmail.com',
    name: '',
    description: '',
    task_comments: [],
    deadline: new Date(),
    implementation_status: 'new'
}

// TODO informacja, że task został utworzony

const CreateTask = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

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
                        {/* TODO wybranie projektu, osoby i deadlinu */}
                        <Input name="name" label="Task Name" handleChange={handleChange} autoFocus half />
                        <Input name="description" label="Task description" handleChange={handleChange} half />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" >{ 'Create Task' } </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateTask;
