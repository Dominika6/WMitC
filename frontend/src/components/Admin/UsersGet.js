import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import User from "./User";


const UsersGet = ({ setCurrentId }) => {

    const { users, isLoading } = useSelector((state) => state.users);
    if (!users?.length && !isLoading) return 'You have no users!';

    return(
        isLoading ? <CircularProgress/> : (
            <>
                {users.map((user) => (
                    <Grid key={user._id} item>
                        <User user={user} setCurrentId={setCurrentId}/><br/>
                    </Grid>
                ))}
            </>
        )
    )
}

export default UsersGet;