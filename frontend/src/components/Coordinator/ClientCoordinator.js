import React from "react";
import { Typography } from "@material-ui/core";
import { Card } from "react-bootstrap";

const ClientCoordinator = ({ client }) => {
  return (
    <Card>
      <Card.Body>
        <div>
          <Typography variant="h6">
            <b>Name:</b> {client.name}
          </Typography>
          <Typography variant="h6">
            <b>Phone:</b> {client.phone_number}
          </Typography>
          <Typography variant="h6">
            <b>Email:</b> {client.email}
          </Typography>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientCoordinator;
