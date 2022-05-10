import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

import logoText from "../../images/logo-txt1.png";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar1 = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>
            <img
              src={logoText}
              alt="Work Management in the Company"
              height="45px"
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text>{user?.result?.name}</Navbar.Text>
        </Navbar.Brand>

        <Nav style={{ display: "flex", flexDirection: "row" }}>
          {user && user?.result.position === "admin" ? (
            <>
              <Link to={"/createUser"} className="nav-link">
                Create User
              </Link>{" "}
              &nbsp;
              <Link to={"/createClient"} className="nav-link">
                Create Client
              </Link>{" "}
              &nbsp;
              <Link to={"/getAllUsers"} className="nav-link">
                Users
              </Link>{" "}
              &nbsp;
              <Link to={"/getAllClients"} className="nav-link">
                Clients
              </Link>{" "}
              &nbsp;
            </>
          ) : user && user?.result.position === "manager" ? (
            <>
              <Link to={"/createProject"} className="nav-link">
                Create Project
              </Link>{" "}
              &nbsp;
              <Link to={"/createTask"} className="nav-link">
                Create Task
              </Link>{" "}
              &nbsp;
              <Link to={"/getMyClients"} className="nav-link">
                Clients
              </Link>{" "}
              &nbsp;
              <Link to={"/getMyTeamC"} className="nav-link">
                My Team
              </Link>
              &nbsp;
              <Link to={"/getAllTasksC"} className="nav-link">
                All Tasks
              </Link>{" "}
              &nbsp;
              <Link to={"/workSummary"} className="nav-link">
                Work Summary
              </Link>
              &nbsp;
              {/*<Link to={"/clientSummary"} className="nav-link">*/}
              {/*  Clients Summary*/}
              {/*</Link>*/}
              {/*&nbsp;*/}
            </>
          ) : user && user?.result.position === "user" ? (
            <>
              <Link to={"/getMyTasks"} className="nav-link">
                Tasks
              </Link>{" "}
              &nbsp;
              <Link to={"/getMyTeam"} className="nav-link">
                Team
              </Link>{" "}
              &nbsp;
            </>
          ) : (
            <> </>
          )}

          {user ? (
            <>
              <Link to={"/myAccount"} className="nav-link">
                Account
              </Link>{" "}
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={logout} variant="outline-danger">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="nav-link">
                <Button variant="primary">Login</Button>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
