import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

import { createProject } from "../../actions/projects";
import { getAllClients } from "../../actions/clients";


const initialState = {
    client: '',
    name: '',
    description: ''
}

// TODO informacja, że project został utworzony, bądź mamy jakiś błąd, po utworzeniu projektu wyczyszczenie formularza

const CreateProject = () => {
    const [formData, setFormData] = useState(initialState);
    const [currentId] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const myClients = [];
    const { clients, isLoading } = useSelector((state) => (state.clients))
    //todo - obsługa isMyClient
    const isMyClient = true;

    useEffect(() => {
        dispatch(getAllClients());
    }, [currentId, dispatch]);

    isLoading === false ?
        clients.map((client) => (isMyClient) ? (
            myClients.push(client)
        ):(<></>)):(console.log())

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                        {myClients.map((client) => (<option value={client?.email} key={client?.email}>{client?.name} ({client?.email})</option> ))}
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
