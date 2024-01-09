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
                <Typography variant="h3" color="textPrimary">
                    My Submissions
                </Typography>
            </Box>
            {submissions && <SubmissionTableTwo submissions={submissions} />}
        </Container>
    )
}
