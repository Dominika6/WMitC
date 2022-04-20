import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";

import useStyles from './styles';
import logoText from "../../images/logo-txt1.png"
import { LOGOUT } from "../../constants/actionTypes";


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({type: LOGOUT});
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={logoText} alt="icon" height="45px"/>
        </Link>
        <Toolbar className={classes.toolbar}>


            {(user && user?.result.position === 'admin') ? (
                <>
                    <Button component={Link} to="/createUser" variant="contained" color="primary">Create User</Button> &nbsp;
                    <Button component={Link} to="/createClient" variant="contained" color="primary">Create Client</Button> &nbsp;
                    <Button component={Link} to="/getAllUsers" variant="contained" color="primary">All Users</Button> &nbsp;
                    <Button component={Link} to="/getAllClients" variant="contained" color="primary">All Clients</Button> &nbsp;
                </>
            ):(user && user?.result.position === 'manager') ? (
                <>
                    <Button component={Link} to="/createProject" variant="contained" color="primary">Create Project</Button> &nbsp;
                    <Button component={Link} to="/createTask" variant="contained" color="primary">Create Task</Button> &nbsp;
                    <Button component={Link} to="/getMyClients" variant="contained" color="primary">My Clients</Button> &nbsp;
                    <Button component={Link} to="/getAllTasksC" variant="contained" color="primary">All Tasks</Button> &nbsp;
                {/* TODO getMyTeam */}
                {/* TODO getMyProjects */}
                {/* TODO getProjectTasks */}

                </>
            ):(user && user?.result.position === 'user') ? (
                <>
                    <Button component={Link} to="/getMyTasks" variant="contained" color="primary">My Tasks</Button> &nbsp;
                    <Button component={Link} to="/getMyTeam" variant="contained" color="primary">My Team</Button> &nbsp;
                </>
            ): <> </> }

            {user ? (
                <>
                    <Button component={Link} to="/myAccount" variant="contained" color="primary">My Account</Button> &nbsp;
                    <div className={classes.profile}>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                </>
            ):(
                <>
                    <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
                </>
            )}
        </Toolbar>
    </AppBar>
    )};

export default Navbar;