import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import SelectProblem from '../../Components/SelectProblem'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext'
export const AddContest = () => {
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    const [title, setTitle] = useState('');
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const api = process.env.REACT_APP_PROBLEM_API;
                const res = await axios.get(api);
                setProblems(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchProblems();
    }, []);
    const onChange = (event) => {
        const { target: { value } } = event;
        setSelectedProblems(typeof value === 'string' ? value.split(',') : value);
    };

    const {currentUserId} = useContext(AuthContext);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = process.env.REACT_APP_CONTEST_API + "add";
            const response = await axios.post(api, {
                title: title,
                startTime: startTime.format(),
                endTime: endTime.format(),
                problems: selectedProblems,
                id: currentUserId,
            })
            console.log(response)
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container maxWidth={"sm"}>
            <Box >
                <Typography>
                    Enter Contest Information Here.
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField id="Contest Title" label="Enter Contest Title " variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField', 'DateTimeField']}>
                        <DateTimeField
                            label="Enter Start Time"
                            value={startTime}
                            referenceDate={dayjs()}
                            onChange={(newValue) => setStartTime(newValue)}
                            required
                        />
                        <DateTimeField
                            label="Enter End Time"
                            value={endTime}
                            referenceDate={dayjs()}
                            onChange={(newValue) => setEndTime(newValue)}
                            required
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <SelectProblem problems={problems} selectedProblems={selectedProblems} onChange={onChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </Box>
        </Container>
    )
}
