import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

import { createUser } from "../../actions/users";
import Input from "../Auth/Input";
import { getAllUsers } from "../../actions/users";


const initialState = {
    supervisor: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: ''
}

const positions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Coordinator' },
    { value: 'user', label: 'Worker' }
];


const CreateUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [currentId] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const { users, isLoading } = useSelector((state) => state.users);
    const allUsers = [];

    useEffect(() => {
        dispatch(getAllUsers())
    }, [currentId, dispatch]);

    isLoading === false ?
        users.map((user) => (
            allUsers.push(user)
        ))
        : (console.log())

    const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.position === 'admin'){
            formData.supervisor = 'none';
        }
        dispatch(createUser(formData, history));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    //todo po zrobieniu konta użytkownika pozostać na stronie, wyczyścić formularz i wyświetlić info, że został utworzony i dane do logowania ( do przekazania dla usera )

    return(
        <Container component="main" maxWidth="xs"><br/><br/>
            <Typography variant="h4">{ 'Create User' }</Typography><br/>
            <form onSubmit={handleSubmit}>
                <Typography>{'First Name'}</Typography>
                <InputGroup>
                    <FormControl aria-label="firstName" name="firstName" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Last Name'}</Typography>
                <InputGroup>
                    <FormControl aria-label="lastName" name="lastName" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Phone Number'}</Typography>
                <InputGroup>
                    <FormControl aria-label="phoneNumber" name="phoneNumber" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Email address'}</Typography>
                <InputGroup>
                    <FormControl aria-label="email" name="email" onChange={handleChange}/>
                </InputGroup><br/>

                <Typography>{'Password'}</Typography>
                <InputGroup>
                    <Input name="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                </InputGroup><br/>

                <Typography>{'Repeat Password'}</Typography>
                <InputGroup>
                    <Input name="confirmPassword" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                </InputGroup><br/>

                <Typography>{'Position'}</Typography>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Control as="select" name="position" onChange={handleChange}>
                        {positions.map((position) => <option value={position.value} key={position.value}>{position.label}</option> )}
                    </Form.Control>
                </Form.Group>

                {formData.position === 'manager' ?
                <>
                    <Typography>{'Supervisor'}</Typography>
                    <Form.Control as="select" name="supervisor" onChange={handleChange}>
                        {allUsers.map((user) => (user.position === 'admin') ? <option value={user.email} key={user.email}>{user.name}</option> : <></> )}
                    </Form.Control><br/>
                </> : (formData.position === 'user') ?
                <>
                    <Typography>{'Supervisor'}</Typography>
                    <Form.Control as="select" name="supervisor" onChange={handleChange}>
                        {allUsers.map((user) => (user.position === 'manager') ? <option value={user.email} key={user.email}>{user.name}</option> : <></> )}
                    </Form.Control><br/>
                </> : (formData.position === 'admin') ? <></>:<></>
                }

                <div className="d-grid gap-2">
                    <Button type="submit" variant="success" >
                        { 'Create User' }
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default CreateUser;
