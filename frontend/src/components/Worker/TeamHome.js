import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTeamBySearch } from "../../actions/users";
import TeamGet from "./TeamGet";

const TeamHome = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    dispatch(getTeamBySearch(user?.result?.id_supervisor));
  }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h3>Your team</h3>
      <br />
      <TeamGet setCurrentId={setCurrentId} />
    </>
  );
};

export default TeamHome;
