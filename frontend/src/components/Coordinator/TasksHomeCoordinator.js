import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTeamTasksBySearch } from '../../actions/tasks';
import TasksGetCoordinator from "./TasksGetCoordinator";


const TasksHomeCoordinator = () => {
    const [currentId, setCurrentId] = useState(0);
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeamTasksBySearch(user?.result?.email));
    }, [currentId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <TasksGetCoordinator setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default TasksHomeCoordinator;