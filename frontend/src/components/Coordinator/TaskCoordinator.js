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
        history.push(`/task/${task._id}`);
    };

    return (
        <Card raised elevation={6}>
            <Container>
                    <ButtonBase onClick={openTask} component="span" name="test" >
                        <div>
                            <Typography variant="h5">{task.id_project}</Typography>
                            {/*TODO: wyciąganie z bazy też danych o projekcie, później pogrupować taski ze względu na projekty*/}
                            <Typography><b>Title:</b> {task.task_name}</Typography>
                            <Typography><b>Deadline:</b> {(task.deadline) ? task?.deadline.split('T')[0] : <></>}</Typography>
                            {/*<Typography><b>Deadline:</b> {task?.deadline.split('T')[0]}</Typography>*/}
                            <Typography><b>User:</b> {task.id_user}</Typography>
                            <Typography><b>Status:</b> {task.implementation_status}</Typography>
                            {task.implementation_status === 'done' ? (
                                <ProgressBar animated now={100} />
                            ):(task.implementation_status === 'in progress' ? (
                                <ProgressBar animated now={50} />
                            ):(<ProgressBar animated now={1} />))}
                        </div>
                    </ButtonBase>
                <CardActions>
                    {(user && user?.result.position === 'manager') ? (
                        <Button size="small" color="secondary" onClick={() => dispatch(deleteTask(task._id))}>
                            {/*TODO dorobić upewnienie się czy chcesz na pewno usunąć, ta operacja jest nieodwracalna*/}
                            <DeleteIcon fontSize="small" /> &nbsp; Delete
                        </Button>
                    ):<></>}
                </CardActions>
            </Container>
        </Card>
    );
};

export default TaskCoordinator;
