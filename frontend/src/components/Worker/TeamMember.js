import React from 'react';
import { Typography} from "@material-ui/core";
import { Card } from 'react-bootstrap';


const TeamMember = ({ teamMember }) => {

    return (
        <Card>
            <Card.Body>
                <div>
                    <Typography variant="h6"><b>Name:</b> {teamMember?.name}</Typography>
                    <Typography variant="h6"><b>Phone:</b> {teamMember?.phone_number}</Typography>
                    <Typography variant="h6"><b>Email:</b> {teamMember?.email}</Typography>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TeamMember;
