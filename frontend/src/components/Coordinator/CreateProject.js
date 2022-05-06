import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

import { createProject } from "../../actions/projects";
import { getClientsBySearch } from "../../actions/clients";


const initialState = {
    client: '',
    name: '',
    description: ''
}

const CreateProject = () => {
    const [loggedUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState(initialState);
    const [currentId] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const { clients } = useSelector((state) => (state.clients))

    useEffect(() => {
        dispatch(getClientsBySearch(loggedUser.result.email));
    }, [currentId, dispatch, loggedUser.result.email]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.client === ""){
            formData.client = clients[0]?.email;
        }
        dispatch(createProject(formData, history));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return(
        <Container component="main" maxWidth="xs"><br/><br/>
            <Typography variant="h4">{ 'Create Project' }</Typography><br/>
            <form onSubmit={handleSubmit}>

                <Typography variant="h6">{'Client'}</Typography>
                <Form.Group >
                    <FormControl as="select" name="client" onChange={handleChange}>
                        {clients?.map((client) => (<option value={client?.email} key={client?.email}>{client?.name} ({client?.email})</option> ))}
                    </FormControl>
                </Form.Group><br/>

                <Typography variant="h6">{'Title'}</Typography>
                <InputGroup>
                    <FormControl as="textarea" aria-label="Title" name="name" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography variant="h6">{'Description'}</Typography>
                <InputGroup>
                    <FormControl as="textarea" aria-label="Description" name="description" onChange={handleChange}/>
                </InputGroup><br/>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="success">Create Project</Button>
                </div>
            </form>
        </Container>
    )
}

export default CreateProject;
