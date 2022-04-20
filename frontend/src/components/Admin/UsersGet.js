import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import User from "./User";


const UsersGet = ({ setCurrentId }) => {

    const { users, isLoading } = useSelector((state) => state.users);

    if (!users?.length && !isLoading) return 'You have no users!';
    return(
        isLoading ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    users.map((user) => (
                        <Grid key={user._id} item xs={12} sm={12} md={6} lg={3}>
                            <User user={user} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
            </Grid>
        )
    )
}

export default UsersGet;