import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Paper, Typography, CircularProgress, Button } from "@material-ui/core";
import { Dropdown } from 'react-bootstrap';

import Comments from "./Comments";
import { getTask, updateTask } from '../../actions/tasks';


const TaskDetails = () => {
    const { task, isLoading } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getTask(id));
    }, [id, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps


    if(isLoading) {
        return <CircularProgress size="7em" />
    }

    if(!task) return null;

    return(
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div>
                <Typography variant="h4">{task.id_project}</Typography><br/>
                <Typography variant="h5">{task.task_name}</Typography><br/>
                <Typography variant="h6">{task.task_description}</Typography><br/>
                <Typography variant="h6"><b>Assigned: </b>{task.id_user}</Typography>
                <Typography variant="h6"><b>Deadline:</b> {task.deadline.split('T')[0]}</Typography>
                <Typography variant="h6"><b>Status:</b> {task.implementation_status}</Typography>
                {user.result.position === 'user' ? (
                   <>
                       <br/><Dropdown.Divider/><br/>
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
                       ):(<>There is a problem with reading the status.</>)}
                   </>
                ) : (<></>)}
                <br/><Dropdown.Divider/><br/>
                <Comments task={task}/>
            </div>
        </Paper>
    );
};

export default TaskDetails;
