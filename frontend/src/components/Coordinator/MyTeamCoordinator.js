import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

import { getTeamBySearch } from "../../actions/users";
import TeamMember from "../Worker/TeamMember";

const TeamHome = () => {
  const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getTeamBySearch(loggedUser?.result?.email));
  }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!users?.length && !isLoading) return "You do not have a team.";
  return (
    <>
      <h3>Your team</h3>
      <br />
      {isLoading ? (
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
      )}
    </>
  );
};

export default TeamHome;
