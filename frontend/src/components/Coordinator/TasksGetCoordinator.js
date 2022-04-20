import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import TaskCoordinator from "./TaskCoordinator";


const TasksGetCoordinator = ({ setCurrentId }) => {

    const { tasks, isLoading } = useSelector((state) => state.tasks);

    if (!tasks.length && !isLoading) return 'Your team has no tasks!';
    return(
        isLoading ? <CircularProgress/> : (
            <Grid container alignItems="stretch" spacing={3}>
                {
                    tasks.map((task) => (
                        <Grid key={task._id} item xs={12} sm={12} md={6} lg={3}>
                            <TaskCoordinator task={task} setCurrentId={setCurrentId} />
                        </Grid>

                    ))}
            </Grid>
        )
    )
}

export default TasksGetCoordinator;