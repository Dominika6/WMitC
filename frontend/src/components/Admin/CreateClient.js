import React, {useEffect, useState} from "react";
import { Typography, Container } from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

import { createClient } from "../../actions/clients";
import { getAllUsers } from "../../actions/users";


const initialState = {
    supervisor: '',
    name: '',
    phoneNumber: '',
    email: ''
}


const CreateClient = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentId] = useState(0);
    const { users, isLoading } = useSelector((state) => state.users);
    const managers = [];

    useEffect(() => {
        dispatch(getAllUsers())
    }, [currentId, dispatch]);

    if(isLoading === false ){
        users.map((user) => {
            if(user?.position === 'manager'){
                managers.push(user)
            }
        })
        initialState.supervisor = managers[0]?.email
    }


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

                <Typography>{'Supervisor'}</Typography>
                <Form.Control as="select" name="supervisor" defaultValue={managers[0]?.email} onChange={handleChange}>
                    {managers.map(user =>(
                            <option key={user?.email} value={user?.email}>{user?.name}</option>
                        )
                    )}
                </Form.Control><br/>

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
