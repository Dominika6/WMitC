import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Paper, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import CommentSection from "./CommentSection";
import { getTask, updateTask } from '../../actions/tasks';
import useStyles from './styles';


const TaskDetails = () => {
    const { task, isLoading } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getTask(id));
    }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

    if(!task) return null;

    if(isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper }>
            <CircularProgress size="7em" />
        </Paper>
    }

    return(
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4" >{task.task_name}</Typography><br/>
                    <Typography variant="h6">{task.id_project}</Typography>
                    <Typography variant="h6">Task description: {task.task_description}</Typography>
                    <Typography variant="h6">Deadline: {task.deadline}</Typography>
                    <Typography variant="h6">Status: {task.implementation_status}</Typography>
                    {/* TODO odświeżanie strony po zmianie statusu zadania */}
                    {user.result.position === 'user' ? (
                       <>
                           <br/><Divider/><br/>
                           Change status of your TASK: &nbsp;
                           {(task.implementation_status === 'new') ? (
                               <>
                                   <Button size="small" color="primary" onClick={() => dispatch(updateTask(task._id, 'in progress'))}>
                                       -> Start Task
                                   </Button>
                               </>
                           ):(task.implementation_status === 'in progress') ? (
                               <>
                                   <Button size="small" color="primary" onClick={() => dispatch(updateTask(task._id, 'done'))}>
                                       -> Finish Task
                                   </Button>
                                   <Button size="small" color="primary" onClick={() => dispatch(updateTask(task._id, 'new'))}>
                                       -> I haven't started task yet
                                   </Button>
                               </>
                           ):(task.implementation_status === 'done') ? (
                               <>
                                   <Button size="small" color="primary" onClick={() => dispatch(updateTask(task._id, 'in progress'))}>
                                       -> I haven't finished task yet
                                   </Button>
                               </>
                           ):(
                               <>
                                   There is a problem with reading the status.
                               </>
                           )}
                       </>
                    ) : (<></>)}
                    <br/><br/><Divider/><br/><br/>

                    <CommentSection task={task}/>
                </div>
            </div>
        </Paper>
    );
};

export default TaskDetails;
