import React, { useState } from 'react';
import { Container, Grow, Grid, Button, Paper, Typography } from '@material-ui/core';
import { updatePassword } from "../../actions/users";
import { useDispatch } from "react-redux";
import Input from "./Input";


const initialState = { email: '', password:'', newPassword:'', newPasswordConfirmation:'' }


const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [passwordData, setPasswordData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => ! prevShowPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if((passwordData.newPassword === passwordData.newPasswordConfirmation) && (passwordData.newPassword !== '')){
            passwordData.email = user?.result.email;
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
            <Container>
                <Grid>
                    Name: {user?.result?.name} <br/>
                    Email: {user?.result?.email} <br/>
                    Phone Number: {user?.result?.phone_number} <br/>
                    Position: {user?.result?.position} <br/>
                    {/*hashed Password: { user?.result?.password}*/}
                    {(user?.result?.position !== 'admin') ? (`Supervisor: ${user?.result?.id_supervisor}`) : (``)} <br/>

                </Grid>
                <br/>
                <Paper>
                    <Typography variant="h6">{'Edit password: '}</Typography>

                    <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input
                                name="password"
                                variant="outlined"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                                label="Current password"
                                value={passwordData.password}
                            /><br/><br/>
                            <Input
                                name="newPassword"
                                variant="outlined"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                                label="New password"
                                value={passwordData.newPassword}
                            /><br/><br/>
                            <Input
                                name="newPasswordConfirmation"
                                variant="outlined"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                                label="Confirm new password"
                                value={passwordData.newPasswordConfirmation}
                            /><br/><br/>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                            >Change password!
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Grow>
    );
};

export default MyAccount;






