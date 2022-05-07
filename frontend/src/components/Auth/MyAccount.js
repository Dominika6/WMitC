import React, { useState } from 'react';
import { Container, Grow, Typography } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { Button, Dropdown } from 'react-bootstrap';

import Input from "./Input";
import { updatePassword } from "../../actions/users";


const initialState = { email: '', password:'', newPassword:'', newPasswordConfirmation:'' }


const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [passwordData, setPasswordData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if((passwordData.newPassword === passwordData.newPasswordConfirmation) && (passwordData.newPassword !== '')){
            passwordData.email = user?.result.email;
            console.log('MyAccount: ', passwordData);
            dispatch(updatePassword(user?.result?._id, passwordData));
        } else {
            alert('"Password" and "Password Confirmation" are different! ')
        }
    };

    const handleChange = (e) => {
        setPasswordData({...passwordData, [e.target.name]: e.target.value});
    };

    return (
        <Grow in>
            <Container component="main" maxWidth="xs">
                <h3><b>{user?.result?.name}</b></h3>
                <br/><Dropdown.Divider/><br/>
                <b>Email:</b> {user?.result?.email} <br/>
                <b>Phone:</b> {user?.result?.phone_number} <br/>
                {(user?.result?.position !== 'admin') ? (<><b>Supervisor:</b> {user?.result?.id_supervisor} <br/></>) : (``)}
                <br/><Dropdown.Divider/><br/>

                <Typography variant="h6">{'Edit password: '}</Typography><br/>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Typography>{'Current password'}</Typography>
                        <Input
                            size="small"
                            name="password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                            value={passwordData.password}
                        /><br/><br/>
                        <Typography>{'New password'}</Typography>
                        <Input
                            name="newPassword"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                            value={passwordData.newPassword}
                        /><br/><br/>
                        <Typography>{'Confirm new password'}</Typography>
                        <Input
                            name="newPasswordConfirmation"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                            value={passwordData.newPasswordConfirmation}
                        /><br/><br/>
                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" >
                                Change my password
                            </Button>
                        </div>
                    </form>
            </Container>
        </Grow>
    );
};

export default MyAccount;






