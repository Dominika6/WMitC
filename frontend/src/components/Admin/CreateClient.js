import React, { useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { createClient } from "../../actions/clients";


const initialState = {
    supervisor: 'coordinator@gmail.com',
    name: '',
    phoneNumber: '',
    email: ''
}

// todo wybieranie koordynatora
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
        <Container component="main" maxWidth="xs"><br/><br/>
            <Typography variant="h4">{ 'Create Client' }</Typography><br/>
            <form onSubmit={handleSubmit}>
                <Typography>{'Company Name'}</Typography>
                <InputGroup>
                    <FormControl aria-label="name" name="name" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Phone Number'}</Typography>
                <InputGroup>
                    <FormControl aria-label="phoneNumber" name="phoneNumber" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Email address'}</Typography>
                <InputGroup>
                    <FormControl aria-label="email" name="email" onChange={handleChange} type="email"/>
                </InputGroup><br/>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="success">
                        { 'Create Client' }
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default CreateClient;
