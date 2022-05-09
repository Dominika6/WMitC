import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import TeamMember from "./TeamMember";

const TeamGet = ({ setCurrentId }) => {
  const { users, isLoading } = useSelector((state) => state.users);
  if (!users?.length && !isLoading)
    return "You are the only member of the team.";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {users.map((teamMember) => (
        <Grid key={teamMember._id} item>
          <TeamMember teamMember={teamMember} setCurrentId={setCurrentId} />
          <br />
        </Grid>
      ))}
    </>
  );
};

export default TeamGet;
