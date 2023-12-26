import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField'
import { Box, Button, Container, Typography } from '@mui/material'
import SelectProblem from '../../Components/SelectProblem'
import axios from 'axios';

export const AddContest = () => {
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [selectedProblems, setSelectedProblems] = useState([]);
    const problems = [
        "problem 1",
        "problem 2"
    ]
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedProblems(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = process.env.REACT_APP_CONTEST_API + "addproblem";
            const response = await axios.post(api,{
                startTime:startTime.format(),
                endTime:endTime.format(),
                problems:selectedProblems})
            console.log(response)
        }catch(err) {
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeField', 'DateTimeField']}>
                        <DateTimeField
                            label="Enter Start Time"
                            value={startTime}
                            referenceDate={dayjs()}
                            onChange={(newValue) => setStartTime(newValue)}
                        />
                        <DateTimeField
                            label="Enter End Time"
                            value={endTime}
                            referenceDate={dayjs()}
                            onChange={(newValue) => setEndTime(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <SelectProblem problems={problems} selectedProblems={selectedProblems} onChange={onChange} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </Box>
        </Container>
    )
}
