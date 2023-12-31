import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { SubmissionTable } from '../../Components/SubmissionTable';
export const AllSubmission = () => {
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function fetchSubmission() {
            try {
                const api = process.env.REACT_APP_SUBMISSION_API;
                const response = await axios.get(api);
                setSubmissions(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubmission();
    }, []);
    return (
        <Container maxWidth='lg'>
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" color="textPrimary">
                    Recent Submissions
                </Typography>
            </Box>
            {submissions && <SubmissionTable submissions={submissions} />}
        </Container>
    )
}
