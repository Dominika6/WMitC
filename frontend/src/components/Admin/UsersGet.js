import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import User from "./User";
import { getAllUsers } from "../../actions/users";

const UsersGet = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [currentId, dispatch]);

  if (!users?.length && !isLoading) return "You have no users!";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Typography variant="h4">
        To edit user account click on the profile.
      </Typography>
      <br />
      {users.map((user) => (
        <Grid key={user._id} item>
          <User user={user} setCurrentId={setCurrentId} />
          <br />
        </Grid>
      ))}
    </>
  );
};

export default UsersGet;
