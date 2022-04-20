import React from 'react';

import { ButtonBase, Card, Typography } from "@material-ui/core";


const User = ({ user }) => {

    return (
        <Card  raised elevation={6}>
            <ButtonBase component="span" name="test" >
                <div>
                    <Typography variant="h6">Name: {user.name}</Typography>
                    <Typography variant="h6">Phone Number: {user.phone_number}</Typography>
                    <Typography variant="h6">Email: {user.email}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
};

export default User;
