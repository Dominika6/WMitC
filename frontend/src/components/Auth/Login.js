import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Input from "./Input";
import { login } from "../../actions/login";


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(formData, history));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{ ' Login ' }</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" >
                        { 'LOGIN' }
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Login;
