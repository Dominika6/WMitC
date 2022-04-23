import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Task from "./Task";


const GetMyTasks = ({ setCurrentId }) => {

    const { tasks, isLoading } = useSelector((state) => state.tasks);
    if (!tasks.length && !isLoading) return 'Congratulation, you\'ve completed all the tasks!';

    return(
        isLoading ? <CircularProgress/> : (
            <>
                {tasks.map((task) => (
                    <Grid key={task._id} item>
                        <Task task={task} setCurrentId={setCurrentId}/><br/>
                    </Grid>
                ))}
            </>
        )
    )
}

export default GetMyTasks;