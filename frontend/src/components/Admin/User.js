import React from "react";
import { Card } from "react-bootstrap";
import { ButtonBase, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const User = ({ user }) => {
  const history = useHistory();

  const openUser = (e) => {
    e.preventDefault();
    history.push(`/user/${user._id}`);
  };

  return (
    <Card>
      <Card.Body>
        <ButtonBase onClick={openUser} component="span">
          <div>
            {user.position === "admin" ? (
              <Typography variant="h5">Administrator</Typography>
            ) : user.position === "manager" ? (
              <Typography variant="h5">Coordinator</Typography>
            ) : user.position === "user" ? (
              <Typography variant="h5">Worker</Typography>
            ) : (
              <></>
            )}
            <br />
            <Typography variant="h6">
              <b>Name:</b> {user.name}
            </Typography>
            <Typography variant="h6">
              <b>Phone:</b> {user.phone_number}
            </Typography>
            <Typography variant="h6">
              <b>Email:</b> {user.email}
            </Typography>
            {user.position === "admin" ? (
              <></>
            ) : (
              <Typography variant="h6">
                <b>Supervisor:</b> {user.id_supervisor}
              </Typography>
            )}
          </div>
        </ButtonBase>
      </Card.Body>
    </Card>
  );
};

export default User;
