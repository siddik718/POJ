import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreData, getData } from '../Authoraization/Auth';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthContext from '../Context/AuthContext';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useContext } from 'react';
export const Login = () => {
    const [data, setdata] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    const { setUsername, setEmail } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = data;
            const api = process.env.REACT_APP_USER_API;
            const response = await axios.post(api + 'login', { email, password });
            if (response) {
                StoreData(response);
                setUsername(getData().data.username);
                setEmail(getData().data.email);
                navigate('/');
            } else {
                setError('No User Found,Please Try Again.')
            }
        } catch (err) {
            setError('Invalid Data,Please Try Again.')
        }
    }
    const handleGoogleSuccess = async (credentialResponse) => {
        const api = process.env.REACT_APP_USER_API + "googleAuth";
        try {
            const response = await axios.post(api, { credentialResponse });
            if (response) {
                StoreData(response);
                setUsername(getData().data.username);
                setEmail(getData().data.email);
                navigate('/');
            } else {
                setError('No User Found,Please Try Again.')
            }
        } catch (err) {
            setError('Invalid Data,Please Try Again.')
        }
    }
    const handleGoogleError = () => {
        setError('Login Failed.');
    }
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            handleGoogleSuccess(credentialResponse);
        },
        onError: () => {
            handleGoogleError();
        },
    });
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        id="email"
                        type='email'
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <Typography variant="body2" color="error" align='center'>
                        {error && error}
                    </Typography>

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Login</Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <NavLink to="/signup">
                                <Typography variant='body2'>
                                    Don't Have a account? SignUp
                                </Typography>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
