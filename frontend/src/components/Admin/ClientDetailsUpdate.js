import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {Button} from "react-bootstrap";

import Input from '../../components/Auth/Input';
import {
    getClient,
    // updateClientCoordinator,
    updateClientEmail,
    // updateClientName,
    updateClientPhone
} from "../../actions/clients";
import { getManagers } from "../../actions/users";


const clientInitialData = { id_supervisor: "", name: "", phone_number: "", email: "" }

const ClientDetailsUpdate = () => {
    const { client } = useSelector((state) => state.clients);
    // const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [clientData, setClientData] = useState(clientInitialData);
    const [currentId] = useState(0);

    useEffect(()=>{
        dispatch(getClient(id));
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getManagers());
    }, [currentId, dispatch]);

    const handleChange = (e) => {
        setClientData({...clientData, [e.target.name]: e.target.value});
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        dispatch(updateClientEmail({id: client?._id, email:  clientData?.email}));
    };

    // const handleSubmitName = async (e) => {
    //     e.preventDefault();
    //     dispatch(updateClientName({id: client?._id, name:  clientData?.name}));
    // };

    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        dispatch(updateClientPhone({id: client?._id, phone_number:  clientData?.phone_number}));
    };

    // const handleSubmitCoordinator = async (e) => {
    //     e.preventDefault();
    //     if(clientData.id_supervisor === ""){
    //         clientData.id_supervisor = users[0]?.email;
    //     }
    //     dispatch(updateClientCoordinator({id: client?._id, id_supervisor:  clientData?.id_supervisor}));
    // };

    // TODO - wszędzie tam, gdzie szukam klienta po mailu, to muszę to zmienić na id, bo można edytować maila

    return(
        <div>
            <Typography variant="h4">Edit client account: <b>{client?.name}</b></Typography><br/><br/>

            <form onSubmit={handleSubmitEmail}>
                <Typography variant="h6"><b>Email: </b>{client?.email}</Typography><br/>
                <Input size="small" name="email" type="email" handleChange={handleChange} value={clientData?.email}/><br/><br/>
                <Button variant="secondary" type="submit">Change email</Button>
            </form><br/><br/>

            {/*<form onSubmit={handleSubmitName}>*/}
            {/*    <Typography variant="h6"><b>Name: </b>{client?.name}</Typography><br/>*/}
            {/*    <Input size="small" name="name" handleChange={handleChange} value={clientData?.name}/><br/><br/>*/}
            {/*    <Button variant="secondary" type="submit">Change name</Button>*/}
            {/*</form><br/><br/>*/}

            <form onSubmit={handleSubmitPhoneNumber}>
                <Typography variant="h6"><b>Phone number: </b>{client?.phone_number}</Typography><br/>
                <Input size="small" name="phone_number" handleChange={handleChange} value={clientData?.phone_number}/><br/><br/>
                <Button variant="secondary" type="submit">Change phone number</Button>
            </form><br/><br/>

            {/*<form onSubmit={handleSubmitCoordinator}>*/}
            {/*    <Typography variant="h6"><b>Coordinator: </b>{client?.id_supervisor}</Typography><br/>*/}
            {/*    <Form.Group className="mb-3" controlId="formBasicSelect">*/}
            {/*        <Form.Control as="select" name="id_supervisor" onChange={handleChange}>*/}
            {/*            { users?.map((manager) => ( <option value={manager?.email} key={manager?.email} >{manager?.name} ({manager?.email})</option> )) }*/}
            {/*        </Form.Control>*/}
            {/*    </Form.Group><br/>*/}
            {/*    <Button variant="secondary" type="submit">Change supervisor</Button>*/}
            {/*</form><br/><br/>*/}

        </div>
    )
}

export default ClientDetailsUpdate;