import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import SubmissionTableTwo from '../../Components/SubmissionTableTwo';
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
                <Typography color="textPrimary" style={{ 
                    fontSize:'2rem',
                    margin: '10px',
                    letterSpacing: '10px',
                 }}>
                    RECENT SUBMISSIONS
                </Typography>
            </Box>
            {submissions && <SubmissionTableTwo submissions={submissions} />}
        </Container>
    )
}
