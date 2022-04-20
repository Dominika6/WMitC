import React from 'react';
import { ButtonBase, Card, Typography} from "@material-ui/core";


const TeamMember = ({ teamMember }) => {

    return (
        <Card  raised elevation={6}>
            <ButtonBase component="span" name="test" >
                <div>
                    <Typography variant="h6">Name: {teamMember.name}</Typography>
                    <Typography variant="h6">Phone: {teamMember.phone_number}</Typography>
                    <Typography variant="h6">Email: {teamMember.email}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
};

export default TeamMember;
