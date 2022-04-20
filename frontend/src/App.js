import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
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



const App = () => {

    //todo - pozwalanie na otwieranie danych stron tylko dla uprawnionych - auth

    return(
        <BrowserRouter>
            <Container maxidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/" />} />
                    <Route path="/task/:id" exact component={TaskDetails} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/myAccount" exact component={MyAccount} />
                    <Route path="/createUser" exact component={CreateUser} />
                    {/*<Route path="/createUser" exact component={() => (!user && !(user?.result.position === "admin") ? <CreateUser /> : <Redirect to='/' />)} />*/}
                    <Route path="/createClient" exact component={CreateClient} />
                    {/*<Route path="/createClient" exact component={() => (!user && !(user?.result.position === "admin") ? <CreateClient /> : <Redirect to='/' />)} />*/}
                    <Route path="/createProject" exact component={CreateProject} />
                    {/*<Route path="/createProject" exact component={() => (!user && !(user?.result.position === "manager") ? <CreateProject /> : <Redirect to='/' />)} />*/}
                    <Route path="/createTask" exact component={CreateTask} />
                    <Route path="/getMyTasks" exact component={WorkerHome} />
                    <Route path="/getMyTeam" exact component={TeamHome} />
                    <Route path="/getMyClients" exact component={ClientsHomeCoordinator} />
                    <Route path="/getAllUsers" exact component={UsersHome} />
                    <Route path="/getAllClients" exact component={ClientsHomeAdmin} />
                    <Route path="/getAllTasksC" exact component={TasksHomeCoordinator} />

                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;
