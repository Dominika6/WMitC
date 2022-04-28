import React from 'react';
import { useHistory } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { Typography } from "@material-ui/core";


const Task = ({ task }) => {
    const history = useHistory();

    const openTask = (e) => {
        history.push(`/task/${task._id}`);
    };

    return (
        <Card>
            <Card.Body onClick={openTask}>
                <div>
                    <Typography variant="h5">{task?.id_project}</Typography><br/>
                    <Typography variant="h6"><b>Title:</b> {task?.task_name}</Typography>
                    <Typography variant="h6"><b>Deadline:</b> {(task.deadline) ? task?.deadline.split('T')[0] : <></>}</Typography>
                    <Typography variant="h6"><b>Status:</b> {task?.implementation_status}</Typography>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Task;
