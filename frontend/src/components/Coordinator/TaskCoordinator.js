import React from 'react';
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonBase, Card, CardActions, Typography } from "@material-ui/core";

import { deleteTask } from "../../actions/tasks";
import { useHistory } from "react-router-dom";
import {Container, OverlayTrigger, ProgressBar, Tooltip} from "react-bootstrap";


const TaskCoordinator = ({ task }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const openTask = (e) => {
        history.push(`/task/${task._id}`);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to see more task details
        </Tooltip>
    );

    return (
        <Card raised elevation={6}>
            <Container>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                    <ButtonBase onClick={openTask} component="span" name="test" >
                        <div>
                            <Typography variant="h6">Project: {task.id_project}</Typography>
                            {/*TODO: wyciąganie z bazy też danych o projekcie, później pogrupować taski ze względu na projekty*/}
                            <Typography variant="h6">Name: {task.task_name}</Typography>
                            <Typography variant="h6">Deadline: {task.deadline}</Typography>
                            <Typography variant="h6">User: {task.id_user}</Typography>
                            <Typography variant="h6">Status: {task.implementation_status}</Typography>
                            {task.implementation_status === 'done' ? (
                                <ProgressBar animated now={100} />
                            ):(task.implementation_status === 'in progress' ? (
                                <ProgressBar animated now={50} />
                            ):(<ProgressBar animated now={1} />))}
                        </div>
                    </ButtonBase>
                </OverlayTrigger>
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
