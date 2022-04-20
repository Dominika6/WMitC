import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import TeamMember from "./TeamMember";


const TeamGet = ({ setCurrentId }) => {
    const { users, isLoading } = useSelector((state) => state.users);

    if (!users?.length && !isLoading) return 'You are the only member of the team.';

    return(
        isLoading ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    users.map((teamMember) => (
                        <Grid key={teamMember._id} item xs={12} sm={12} md={6} lg={3}>
                            <TeamMember teamMember={teamMember} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
            </Grid>
        )
    )
}

export default TeamGet;