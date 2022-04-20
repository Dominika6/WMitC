import React from 'react';
import { ButtonBase, Card, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const Task = ({ task }) => {
    const history = useHistory();

    const openTask = (e) => {
        history.push(`/task/${task._id}`);
    };

    return (
        <Card  raised elevation={6}>
            <ButtonBase onClick={openTask} component="span" name="test" >
                <div>
                    <Typography variant="h6">{task.id_project}</Typography>
                    <Typography variant="h6">Task name: {task.task_name}</Typography>
                    <Typography variant="h6">Deadline: {task.deadline}</Typography>
                    <Typography variant="h6">Status: {task.implementation_status}</Typography>
                </div>
            </ButtonBase>
        </Card>
    );
};

export default Task;
