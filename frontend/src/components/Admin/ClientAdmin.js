import React from 'react';

import { ButtonBase, Card, Typography } from "@material-ui/core";

const ClientAdmin = ({ client }) => {

    return (
        <Card  raised elevation={6}>
            <ButtonBase component="span" name="test" >
                <div>
                    <Typography variant="h6">Name: {client.name}</Typography>
                    <Typography variant="h6">Phone Number: {client.phone_number}</Typography>
                    <Typography variant="h6">Email: {client.email}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
};

export default ClientAdmin;
