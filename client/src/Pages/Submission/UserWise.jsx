import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import AuthContext from '../../Context/AuthContext';
// import { SubmissionTable } from '../../Components/SubmissionTable';
import SubmissionTableTwo from '../../Components/SubmissionTableTwo';

export const UserWise = () => {
    const { username } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function fetchSubmission() {
            try {
                const api = process.env.REACT_APP_SUBMISSION_API + "me/" + username;
                const response = await axios.get(api);
                setSubmissions(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubmission();
    }, [username]);
    return (
        <Container maxWidth='xl'>
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography color="textPrimary" style={{ 
                    fontSize:'2rem',
                    margin: '10px',
                    letterSpacing: '10px',
                 }}>
                    MY SUBMISSIONS
                </Typography>
            </Box>
            {submissions && <SubmissionTableTwo submissions={submissions} />}
        </Container>
    )
}
