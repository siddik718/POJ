import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
    const [data, setdata] = useState({
        email: "",
        password: "",
        username: "",
        cpassword: ""
    });
    const [error , setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, email, password, cpassword } = data;
            if (password !== cpassword) {
                setError('Password Did not match.')
            } else {
                const api = process.env.REACT_APP_USER_API;
                const response = await axios.post(api + 'register', { username, email, password });
                // console.log(response);
                if (response) {
                    navigate('/login');
                } else {
                    setError('No User Found,Please Try Again.')
                }
            }
        } catch (err) {
            setError('Invalid Data,Please Try Again.')
        }

    }
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
                        id="username"
                        label="Enter Username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type='email'
                        label="Enter Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        value={data.cpassword}
                        onChange={handleChange}
                    />

                    <Typography variant="body2" color="error" align='center'>
                        {error && error}
                    </Typography>
                    
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Sign up</Button>
                </Box>
            </Box>
        </Container>
    )
}


