import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import {Dropdown, Button, ProgressBar} from 'react-bootstrap';

import Comments from "./Comments";
import { getTask, updateTask, updateTaskWorkHours} from '../../actions/tasks';
import Input from '../../components/Auth/Input';


const initialData = { hoursToAdd: 0 }

const TaskDetails = () => {
    const { task, isLoading } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [hoursData, setHoursData] = useState(initialData);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getTask(id));
    }, [id, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = (e) => {
        e.preventDefault();
        const hours = parseInt(task?.hours_worked) + parseInt(hoursData?.hoursToAdd);
        const formData = {id: task._id, hours_worked: hours }
        console.log(formData)
        dispatch(updateTaskWorkHours(formData));
    };

    const handleChange = (e) => {
        setHoursData({...hoursData, [e.target.name]: e.target.value});
    };

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
                <Typography variant="h6"><b>Assigned employee: </b>{task.id_user}</Typography>
                <Typography variant="h6"><b>Deadline:</b> {task.deadline.split('T')[0]}</Typography>
                <Typography variant="h6"><b>Hours worked:</b> {task?.hours_worked} hours</Typography>
                <Typography variant="h6"><b>Estimated time of task completion:</b> {task?.estimated_hours} hours</Typography>
                <Typography variant="h6"><b>Status:</b> {task.implementation_status}</Typography><br/>
                <ProgressBar animated now={parseInt(task?.hours_worked)/parseInt(task?.estimated_hours)*100}/><br/>

                {user.result.position === 'user' ? (
                <>
                    <Dropdown.Divider/><br/>
                    {/*https://react-bootstrap.github.io/forms/layout/#auto-sizing*/}

                    {(task.implementation_status === 'new') ? (
                        <>
                            Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button size="small" variant="success" onClick={() => dispatch(updateTask(task._id, 'in progress'))}>
                            Start Task
                            </Button><br/>
                        </>
                    ):(task.implementation_status === 'in progress') ? (
                        <>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="body1">{ 'Add to the time worked on this task:' }</Typography><br/>
                                <Input size='small' type="number" name="hoursToAdd" handleChange={handleChange} value={hoursData?.hoursToAdd}/><br/><br/>
                                <Button variant="success" type="submit" >Add</Button><br/><br/>
                            </form>
                            Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button size="small" variant="success" onClick={() => dispatch(updateTask(task._id, 'done'))}>
                                Finish Task
                            </Button> &nbsp;
                            <Button size="small" variant="secondary" onClick={() => dispatch(updateTask(task._id, 'new'))}>
                                I haven't started task yet
                            </Button><br/>
                        </>
                    ):(task.implementation_status === 'done') ? (
                        <>
                            Change status of your TASK: &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button size="small" variant="secondary" onClick={() => dispatch(updateTask(task._id, 'in progress'))}>
                                I haven't finished task yet
                            </Button><br/>
                        </>
                    ):(<>There is a problem with reading the status.</>)}
                    <br/>
                </>
                ) : (<></>)}
                <Dropdown.Divider/><br/>
                <Comments task={task}/>
            </div>
        </Paper>
    );
};

export default TaskDetails;
