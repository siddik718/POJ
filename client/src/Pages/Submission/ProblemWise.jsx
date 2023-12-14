import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Typography from '@mui/material/Typography'
import { Box, Container, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SubmissionTable } from '../../Components/SubmissionTable';

export const ProbleWise = () => {
    const [submissions, setSubmissions] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchSubmission() {
            try {
                const api = process.env.REACT_APP_SUBMISSION_API + "problem/" + id;
                const response = await axios.get(api);
                setSubmissions(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchSubmission();
    }, [id]);
    return (
        <Container maxWidth='lg'>
              <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" color="textPrimary">
                    Recent Submissions
                </Typography>
            </Box>
            {submissions && <SubmissionTable submissions={submissions}/>}
        </Container>
    )
}
