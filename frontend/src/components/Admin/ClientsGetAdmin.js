import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import Client from "./ClientAdmin";
import { getAllClients } from "../../actions/clients";

const ClientGetAdmin = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { clients, isLoading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getAllClients());
  }, [currentId, dispatch]);

  if (!clients?.length && !isLoading) return "You have no clients!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h4">
        To edit client account click on the profile.
      </Typography>
      <br />
      {clients.map((client) => (
        <Grid key={client._id} item>
          <Client client={client} setCurrentId={setCurrentId} />
          <br />
        </Grid>
      ))}
    </>
  );
};

export default ClientGetAdmin;
