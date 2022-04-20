import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTeamBySearch } from '../../actions/users';
import TeamGet from "./TeamGet";


const TeamHome = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        dispatch(getTeamBySearch(user?.result?.id_supervisor));
    }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <TeamGet setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default TeamHome;