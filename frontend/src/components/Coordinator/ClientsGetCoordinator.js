import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Client from "./ClientCoordinator";

const ClientsGetCoordinator = ({ setCurrentId }) => {
  const { clients, isLoading } = useSelector((state) => state.clients);
  if (!clients.length && !isLoading) return "You have no clients assigned!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {clients.map((client) => (
        <Grid key={client._id} item>
          <Client client={client} setCurrentId={setCurrentId} />
          <br />
        </Grid>
      ))}
    </>
  );
};

export default ClientsGetCoordinator;
