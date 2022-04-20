import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Task from "./Task";


const GetMyTasks = ({ setCurrentId }) => {

    const { tasks, isLoading } = useSelector((state) => state.tasks);

    if (!tasks.length && !isLoading) return 'Congratulation, you\'ve completed all the tasks!';

    return(
        isLoading ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    tasks.map((task) => (
                    <Grid key={task._id} item xs={12} sm={12} md={6} lg={3}>
                        <Task task={task} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default GetMyTasks;