import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";

import logoText from "../../images/logo-txt1.png";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar1 = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    sessionStorage.clear();
    history.push("/");
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="justify-content-end">
            {user && user?.result.position === "admin" ? (
              <>
                <Nav.Link href="/createUser">Create User</Nav.Link> &nbsp;
                <Nav.Link href="/createClient">Create Client</Nav.Link> &nbsp;
                <Nav.Link href="/getAllUsers">Users</Nav.Link> &nbsp;
                <Nav.Link href="/getAllClients">Clients</Nav.Link> &nbsp;
              </>
            ) : user && user?.result.position === "manager" ? (
              <>
                <Nav.Link href="/createProject">Create Project</Nav.Link> &nbsp;
                <Nav.Link href="/createTask">Create Task</Nav.Link> &nbsp;
                <Nav.Link href="/getMyClients">Clients</Nav.Link> &nbsp;
                <Nav.Link href="/getMyTeamC">Team</Nav.Link> &nbsp;
                <Nav.Link href="/getAllTasksC">Tasks</Nav.Link> &nbsp;
                <NavDropdown title="Summary" id="basic-nav-dropdown">
                  <NavDropdown.Item href={"/workSummary"}>
                    Tasks
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/usersSummary"}>
                    Workers
                  </NavDropdown.Item>
                  <NavDropdown.Item href={"/clientsSummary"}>
                    Clients
                  </NavDropdown.Item>
                </NavDropdown>
                &nbsp;
              </>
            ) : user && user?.result.position === "user" ? (
              <>
                <Nav.Link href="/getMyTasks">Tasks</Nav.Link> &nbsp;
                <Nav.Link href="/getMyTeam">Team</Nav.Link> &nbsp;
              </>
            ) : (
              <> </>
            )}
            {user ? (
              <>
                <Nav.Link href="/myAccount">Account</Nav.Link> &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={logout} variant="outline-danger">
                  Logout
                </Button>
              </>
            ) : window.location.pathname !== "/login" ? (
              <>
                <Nav.Link href="/login">
                  <Button variant="outline-success">Login</Button>
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
