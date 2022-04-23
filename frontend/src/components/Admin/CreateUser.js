import React, { useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { createUser } from "../../actions/users";
import Input from "../Auth/Input";


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

                {/*TODO Na razie koordynatora i pozycję dodajemy na sztywno - zrobić select */}
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
