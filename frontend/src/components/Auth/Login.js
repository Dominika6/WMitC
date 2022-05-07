import React, { useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FormControl, InputGroup } from 'react-bootstrap';
import { Button } from "react-bootstrap";

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
                <Typography variant="h4">{ ' WMitC ' }</Typography><br/>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6">{'Email address'}</Typography>
                    <InputGroup>
                        <FormControl size="lg" required aria-label="Email address" name="email" onChange={handleChange}/>
                    </InputGroup><br/>

                    <Typography variant="h6">{'Password'}</Typography>
                    <Input name="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    <br/><br/>

                    <div className="d-grid gap-2">
                        <Button type="submit" variant="success">
                            { 'Log in' }
                        </Button>
                    </div>
                </form>
        </Container>
    )
}

export default Login;
