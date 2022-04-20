import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Input from "../Auth/Input";
import { createUser } from "../../actions/users";


const initialState = {
    supervisor: 'coordinator@gmail.com',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: 'user'
}

// const positions = [
//     { value: 'admin', label: 'Administrator' },
//     { value: 'manager', label: 'Coordinator' },
//     { value: 'user', label: 'Worker' }
// ];


//https://dev.to/helmarjunior/using-react-select-async-with-react-hooks-and-pagination-22g2 -> TODO WYBIERANIE

// TODO po zrobieniu usera brak przekierowania (logowania ) i wyświetlenie danych do logowania ( do przekazania dla usera )

const CreateUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(createUser(formData, history));

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    //todo po zrobieniu konta użytkownika pozostać na stronie, wyczyścić formularz i wyświetlić info, że został utworzony

    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{ 'Create User' }</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} half />
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {/*TODO Na razie koordynatora i pozycję dodajemy na sztywno - zrobić select */}
                        </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        { 'Create User' }
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateUser;
