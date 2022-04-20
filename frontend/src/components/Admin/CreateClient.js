import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Input from "../Auth/Input";
import { createClient } from "../../actions/clients";


const initialState = {
    supervisor: 'coordinator@gmail.com',
    name: '',
    phoneNumber: '',
    email: ''
}

// TODO informacja, że client został utworzony

const CreateClient = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(createClient(formData, history));

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{ 'Create Client' }</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="name" label="Company Name" handleChange={handleChange} autoFocus half />
                        <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} half />
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        { 'Create Client' }
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateClient;
