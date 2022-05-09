import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Button } from "react-bootstrap";

import {
  getUser,
  getManagers,
  // updateUserEmail,
  updateUserName,
  updateUserPhone,
  // updateUserCoordinator,
  resetPassword,
} from "../../actions/users";
import Input from "../../components/Auth/Input";

const userInitialData = {
  email: "",
  newEmail: "",
  name: "",
  phone_number: "",
  tmpPassword: "",
  id_supervisor: "",
};

const UserDetailsUpdate = () => {
  const { user } = useSelector((state) => state.users);
  // const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState(userInitialData);
  const [currentId] = useState(0);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getManagers());
  }, [currentId, dispatch]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleSubmitEmail = async (e) => {
  //     e.preventDefault();
  //     dispatch(updateUserEmail({id: user?._id, email:  userData?.email}));
  // };

  const handleSubmitName = async (e) => {
    e.preventDefault();
    dispatch(updateUserName({ id: user?._id, name: userData?.name }));
  };

  const handleSubmitPhoneNumber = async (e) => {
    e.preventDefault();
    dispatch(
      updateUserPhone({ id: user?._id, phone_number: userData?.phone_number })
    );
  };

  // const handleSubmitCoordinator = async (e) => {
  //     e.preventDefault();
  //     if(userData.id_supervisor === ""){
  //         userData.id_supervisor = users[0]?.email;
  //     }
  //     dispatch(updateUserCoordinator({id: user?._id, id_supervisor:  userData?.id_supervisor}));
  // };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({ id: user?._id, tmpPassword: userData?.tmpPassword })
    );
  };

  return (
    <div>
      <Typography variant="h4">
        Edit user account: <b>{user?.name}</b>
      </Typography>
      <br />
      <br />
      {/*<form onSubmit={handleSubmitEmail}>*/}
      {/*    <Typography variant="h6"><b>Email: </b>{user?.email}</Typography><br/>*/}
      {/*    <Input size="small" name="email" type="email" handleChange={handleChange} value={userData?.email}/><br/><br/>*/}
      {/*    <Button variant="secondary" type="submit">Change email</Button>*/}
      {/*</form><br/><br/>*/}

      <form onSubmit={handleSubmitName}>
        <Typography variant="h6">
          <b>Name: </b>
          {user?.name}
        </Typography>
        <br />
        <Input
          size="small"
          name="name"
          handleChange={handleChange}
          value={userData?.name}
        />
        <br />
        <br />
        <Button variant="secondary" type="submit">
          Change name
        </Button>
      </form>
      <br />
      <br />

      <form onSubmit={handleSubmitPhoneNumber}>
        <Typography variant="h6">
          <b>Phone number: </b>
          {user?.phone_number}
        </Typography>
        <br />
        <Input
          size="small"
          name="phone_number"
          handleChange={handleChange}
          value={userData?.phone_number}
        />
        <br />
        <br />
        <Button variant="secondary" type="submit">
          Change phone number
        </Button>
      </form>
      <br />
      <br />

      {/*<form onSubmit={handleSubmitCoordinator}>*/}
      {/*    <Typography variant="h6"><b>Supervisor: </b>{user?.id_supervisor}</Typography><br/>*/}
      {/*    <Form.Group className="mb-3" controlId="formBasicSelect">*/}
      {/*        <Form.Control as="select" name="id_supervisor" onChange={handleChange}>*/}
      {/*            { users?.map((manager) => ( <option value={manager?.email} key={manager?.email} >{manager?.name} ({manager?.email})</option> )) }*/}
      {/*        </Form.Control>*/}
      {/*    </Form.Group><br/>*/}
      {/*    <Button variant="secondary" type="submit">Change supervisor</Button>*/}
      {/*</form><br/><br/>*/}

      <form onSubmit={handlePasswordReset}>
        <Typography variant="h6">
          <b>Reset password:</b> enter a temporary password.
        </Typography>
        <br />
        <Input
          size="small"
          name="tmpPassword"
          handleChange={handleChange}
          value={userData.tmpPassword}
        />
        <br />
        <br />
        <Button variant="danger" type="submit">
          Reset password
        </Button>
        <br />
      </form>
      <br />
      <br />
    </div>
  );
};

export default UserDetailsUpdate;
