import React from 'react';
import { Card } from 'react-bootstrap';
import { Typography } from "@material-ui/core";


const ClientAdmin = ({ client }) => {

    return (
        <Card>
            <Card.Body>
                <div>
                    <Typography variant="h6"><b>Name:</b> {client.name}</Typography>
                    <Typography variant="h6"><b>Phone:</b> {client.phone_number}</Typography>
                    <Typography variant="h6"><b>Email:</b> {client.email}</Typography>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ClientAdmin;
