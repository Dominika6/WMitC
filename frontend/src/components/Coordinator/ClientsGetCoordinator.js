import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Client from "./ClientCoordinator";


const ClientsGetCoordinator = ({ setCurrentId }) => {

    const { clients, isLoading } = useSelector((state) => state.clients);

    if (!clients.length && !isLoading) return 'You have no clients assigned!';

    return(
        isLoading ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    clients.map((client) => (
                        <Grid key={client._id} item xs={12} sm={12} md={6} lg={3}>
                            <Client client={client} setCurrentId={setCurrentId} />
                        </Grid>

                    ))}
            </Grid>
        )
    )
}

export default ClientsGetCoordinator;