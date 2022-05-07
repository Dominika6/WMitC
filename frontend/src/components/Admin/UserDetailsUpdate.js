import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {Button, Form} from "react-bootstrap";

import {getUser, getManagers, updateUserEmail, updateUserName, updateUserPhone, updateUserCoordinator} from "../../actions/users";
import Input from '../../components/Auth/Input';

const userInitialData = { email: "", newEmail: "", name:"", phone_number:"" };

const UserDetailsUpdate = () => {

    const { user } = useSelector((state) => state.users);
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [userData, setUserData] = useState(userInitialData);
    const [currentId] = useState(0);


    useEffect(() => {
        dispatch(getUser(id));
    },[id, dispatch]);

    useEffect(() => {
        dispatch(getManagers());
    }, [currentId, dispatch]);

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        dispatch(updateUserEmail({id: user?._id, email:  userData?.email}));
    };

    const handleSubmitName = async (e) => {
        e.preventDefault();
        dispatch(updateUserName({id: user?._id, name:  userData?.name}));
    };

    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        dispatch(updateUserPhone({id: user?._id, phone_number:  userData?.phone_number}));
    };

    const handleSubmitCoordinator = async (e) => {
        e.preventDefault();
        dispatch(updateUserCoordinator({id: user?._id, id_supervisor:  userData?.id_supervisor}));
    };

    return(
        <div>
            <h3>Edit {user?.name}:</h3><br/><br/>
            <form onSubmit={handleSubmitEmail}>
                <Typography variant="h6"><b>Email: </b>{user?.email}</Typography><br/>
                <Input size="small" name="email" type="email" handleChange={handleChange} value={userData?.email}/><br/><br/>
                <Button variant="success" type="submit">Change email</Button>
            </form><br/><br/>

            <form onSubmit={handleSubmitName}>
                <Typography variant="h6"><b>Name: </b>{user?.name}</Typography><br/>
                <Input size="small" name="name" handleChange={handleChange} value={userData?.name}/><br/><br/>
                <Button variant="success" type="submit">Change name</Button>
            </form><br/><br/>

            <form onSubmit={handleSubmitPhoneNumber}>
                <Typography variant="h6"><b>Phone number: </b>{user?.phone_number}</Typography><br/>
                <Input size="small" name="phone_number" handleChange={handleChange} value={userData?.phone_number}/><br/><br/>
                <Button variant="success" type="submit">Change phone number</Button>
            </form><br/><br/>

            <form onSubmit={handleSubmitCoordinator}>
                <Typography variant="h6"><b>Supervisor: </b>{user?.id_supervisor}</Typography><br/>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Control as="select" name="id_supervisor" onChange={handleChange}>
                        { users?.map((manager) => ( <option value={manager?.email} key={manager?.email} >{manager?.name} ({manager?.email})</option> )) }
                    </Form.Control>
                </Form.Group><br/>
                <Button variant="success" type="submit">Change supervisor</Button>

            </form>
            {/*<Typography variant="h6">{user?.password}</Typography>*/}
        {/*    todo reset hasła*/}
        </div>
    )
}

export default UserDetailsUpdate;