import React from 'react';
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonBase, Card, CardActions, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Container, ProgressBar } from "react-bootstrap";

import { deleteTask } from "../../actions/tasks";


const TaskCoordinator = ({ task }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const openTask = (e) => {
        e.preventDefault();
        history.push(`/task/${task._id}`);
    };

    const clickDeleteTask = (e) => {
        e.preventDefault();
        if(window.confirm('You cannot undo this operation. Are you sure you want to delete this task?')){
            dispatch(deleteTask(task._id));
            window.location.reload();
        } else {
            console.log('Task has not been deleted.');
        }
    };

    return (
        <>
            <br/>
            <Card raised elevation={6}>
                <Container>
                    <ButtonBase onClick={openTask} component="span" name="test" >
                        <div>
                            <br/><Typography><b>{task.task_name}</b></Typography><br/>
                            <Typography>{task.id_user}</Typography>
                            <Typography>{(task.deadline) ? task?.deadline.split('T')[0] : <></>}</Typography>
                            <Typography><b>Status:</b> {task.implementation_status}</Typography>
                            <ProgressBar animated now={parseInt(task?.hours_worked)/parseInt(task?.estimated_hours)*100} />
                        </div>
                    </ButtonBase>

                    <CardActions>
                        {(user && user?.result.position === 'manager') ? (
                            <Button size="small" color="secondary" onClick={clickDeleteTask}>
                                <DeleteIcon fontSize="small" /> &nbsp; Delete
                            </Button>
                        ):<></>}
                    </CardActions>
                </Container>
            </Card>
        </>
    );
};

export default TaskCoordinator;
