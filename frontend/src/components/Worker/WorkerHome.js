import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTasksBySearch } from '../../actions/tasks';
import GetMyTasks from "./GetMyTasks";


const WorkerHome = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        dispatch(getTasksBySearch(user?.result?.email));
    }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <GetMyTasks setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default WorkerHome;