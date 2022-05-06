import React from 'react';
import { Card } from 'react-bootstrap';
import { Typography } from "@material-ui/core";


const User = ({ user }) => {

    return (
        <Card>
            <Card.Body>
                <div>
                    <Typography variant="h5">{user.position}</Typography><br/>
                    <Typography variant="h6"><b>Name:</b> {user.name}</Typography>
                    <Typography variant="h6"><b>Phone:</b> {user.phone_number}</Typography>
                    <Typography variant="h6"><b>Email:</b> {user.email}</Typography>
                    <Typography variant="h6"><b>Supervisor:</b> {user.id_supervisor}</Typography>
                </div>
            </Card.Body>
        </Card>
    );
};

export default User;
