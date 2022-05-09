import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, CircularProgress, Divider} from "@material-ui/core";
import { Container } from "react-bootstrap";

import TaskCoordinator from "./TaskCoordinator";
import {getMyClientsProjects} from "../../actions/projects";


const TasksGetCoordinator = ({ setCurrentId }) => {

    const { tasks, isLoading } = useSelector((state) => state.tasks);
    const [loggedUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { projects } = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMyClientsProjects(loggedUser.result.email));
    }, [dispatch, loggedUser.result.email]);

    if (!tasks.length && !isLoading) return 'Your team has no tasks!';

    return(
        isLoading ? <CircularProgress/> : (
            <Container>
                {tasks?.map((task_group, index) => (
                    <div key={index}>
                        <br/>
                        {task_group[0]?.id_project ?
                            <Grid>
                                <h3>{task_group[0]?.id_project}</h3>
                            </Grid> :
                            <Grid>
                                <h3>{projects[index]?.project_name}</h3>
                                <p>There are no tasks defined in this project.</p>
                            </Grid>
                        }
                        {task_group?.map((task, index) => (
                            <TaskCoordinator key={index} task={task} setCurrentId={setCurrentId}/>
                        ))}<br/>
                        <Divider/>
                    </div>
                ))}
            </Container>
        )
    )
}

export default TasksGetCoordinator;