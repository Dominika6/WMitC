import React, {useState} from "react";
import { Container } from "@material-ui/core";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar1 from "./components/Navbar/Navbar1";
import Login from "./components/Auth/Login";
import MyAccount from "./components/Auth/MyAccount";
import CreateUser from "./components/Admin/CreateUser";
import CreateClient from "./components/Admin/CreateClient";
import CreateProject from "./components/Coordinator/CreateProject";
import CreateTask from "./components/Coordinator/CreateTask";
import WorkerHome from "./components/Worker/WorkerHome";
import ClientsHomeCoordinator from "./components/Coordinator/ClientsHomeCoordinator";
import ClientsHomeAdmin from "./components/Admin/ClientsHomeAdmin";
import TeamHome from "./components/Worker/TeamHome";
import UsersHome from "./components/Admin/UsersHome";
import TasksHomeCoordinator from "./components/Coordinator/TasksHomeCoordinator";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import About from "./About";
import MyTeamCoordinator from "./components/Coordinator/MyTeamCoordinator";


const App = () => {

    const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));

    return(
        <BrowserRouter>
            <Container maxidth="xl">
                <Navbar1/>
                <br/><br/><br/><br/><br/>
                <Switch>

                    <Route path="/" exact component={About} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/task/:id" exact component={() => (loggedUser ? <TaskDetails/> : <Redirect to='/' />)} />
                    <Route path="/myAccount" exact component={() => (loggedUser ? <MyAccount/> : <Redirect to='/' />)} />

                    <Route path="/createUser" exact component={() => (loggedUser?.result?.position === 'admin' ? <CreateUser/> : <Redirect to='/' />)} />
                    <Route path="/getAllUsers" exact component={() => (loggedUser?.result?.position === 'admin' ? <UsersHome/> : <Redirect to='/' />)} />
                    <Route path="/createClient" exact component={() => (loggedUser?.result?.position === 'admin' ? <CreateClient/> : <Redirect to='/' />)} />
                    <Route path="/getAllClients" exact component={() => (loggedUser?.result?.position === 'admin' ? <ClientsHomeAdmin/> : <Redirect to='/' />)} />

                    <Route path="/createTask" exact component={() => (loggedUser?.result?.position === 'manager' ? <CreateTask/> : <Redirect to='/' />)} />
                    <Route path="/getMyTeamC" exact component={() => (loggedUser?.result?.position === 'manager' ? <MyTeamCoordinator/> : <Redirect to='/' />)} />
                    <Route path="/getMyClients" exact component={() => (loggedUser?.result?.position === 'manager' ? <ClientsHomeCoordinator/> : <Redirect to='/' />)} />
                    <Route path="/getAllTasksC" exact component={() => (loggedUser?.result?.position === 'manager' ? <TasksHomeCoordinator/> : <Redirect to='/' />)} />
                    <Route path="/createProject" exact component={() => (loggedUser?.result?.position === 'manager' ? <CreateProject/> : <Redirect to='/' />)} />

                    <Route path="/getMyTeam" exact component={() => (loggedUser?.result?.position === 'user' ? <TeamHome/> : <Redirect to='/' />)} />
                    <Route path="/getMyTasks" exact component={() => (loggedUser?.result?.position === 'user' ? <WorkerHome/> : <Redirect to='/' />)} />

                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;
