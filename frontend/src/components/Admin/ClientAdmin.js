import React from "react";
import { Card } from "react-bootstrap";
import { ButtonBase, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ClientAdmin = ({ client }) => {
  const history = useHistory();

  const openClient = (e) => {
    e.preventDefault();
    history.push(`/client/${client._id}`);
  };

  return (
    <Card>
      <Card.Body>
        <ButtonBase onClick={openClient} component="span">
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
            <Typography variant="h6">
              <b>Supervisor:</b> {client.id_supervisor}
            </Typography>
          </div>
        </ButtonBase>
      </Card.Body>
    </Card>
  );
};

export default ClientAdmin;
