import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Input from "../Auth/Input";
import { createProject } from "../../actions/projects";


const initialState = {
    client: 'company@gmail.com',
    name: '',
    description: ''
}

// TODO informacja, że project został utworzony

const CreateProject = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(createProject(formData, history));

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{ 'Create Project' }</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/*TODO wybranie klienta dla którego przypisujemy ten project*/}
                        <Input name="name" label="Project Name" handleChange={handleChange} autoFocus half />
                        <Input name="description" label="Project description" handleChange={handleChange} half />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" >{ 'Create Project' } </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateProject;
