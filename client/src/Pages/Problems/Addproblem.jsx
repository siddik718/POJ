import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Box, Container, CssBaseline, Typography, TextField, Button, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import TextEditor from '../../Components/TextEditor';
import AuthContext from '../../Context/AuthContext';

const tags = ['binary Search', 'bitmask', 'brute force', 'combinatorics', 'number theory', "greedy", 'dfs and bfs', 'divide and conquer', 'dynamic programming', 'geometry'];

export const Addproblem = () => {
    const [data, setdata] = useState({
        title: "",
        sampleInput: "",
        sampleOutput: "",
        input: "",
        output: "",
        difficulty: ""
    });
    const [statement, setStatement] = useState('');
    const handleStatementChange = (value) => {
        setStatement(value);
    };
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    const [constraint, setConstraints] = useState({
        timeLimit: 0,
        memoryLimit: 0
    })
    const handleChangeOnConstraint = (e) => {
        setConstraints({ ...constraint, [e.target.name]: Math.max(e.target.value, 0) });
    }
    const [selectedTags, setSelectedTags] = useState([tags[0]]);
    const handleTagsChange = (event, newValue) => {
        setSelectedTags(newValue);
    };
    const { username } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, sampleInput, sampleOutput, input, output, difficulty } = data;
        const { timeLimit, memoryLimit } = constraint;

        // console.log('Username ' + username); // 0
        // console.log('Title' + title); // 1
        // console.log('statement' + statement); // 2
        // console.log('sampleInput' + sampleInput); // 3
        // console.log('sampleOutput' + sampleOutput); // 4
        // console.log('input' + input); // 5
        // console.log('output' + output); // 6
        // console.log('timeLimit' + timeLimit); // 7
        // console.log('memoryLimit' + memoryLimit); // 8
        // console.log('tags' + selectedTags); // 9
        // console.log('difficulty' + difficulty); // 10

        try {
            const api = process.env.REACT_APP_PROBLEM_API;
            const response = await axios.post(api + 'add-problem', { username, title, statement, sampleInput, sampleOutput, input, output, timeLimit, memoryLimit, selectedTags, difficulty });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px 0'
            }}>
                <Typography component='h6' variant="h5" color="initial">
                    Please Fill All The Required Form
                </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    margin='normal'
                    type='text'
                    id="title"
                    name='title'
                    label="Enter The Title"
                    value={data.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    autoFocus
                />

                <TextField
                    margin='normal'
                    type="text"
                    id="sampleInput"
                    name="sampleInput"
                    label="Enter The Sample Input"
                    value={data.sampleInput}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    margin='normal'
                    type="text"
                    id="sampleOutput"
                    name="sampleOutput"
                    label="Enter The Sample Output"
                    value={data.sampleOutput}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    margin='normal'
                    id="input"
                    label="Enter The Test Input"
                    type="file"
                    name="input"
                    value={data.input}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    margin='normal'
                    id="output"
                    label="Enter The Expected Output"
                    type="file"
                    name="output"
                    value={data.output}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    margin='normal'
                    id='timeLimit'
                    label="Enter Time Limit Per Test Case"
                    type='number'
                    name='timeLimit'
                    value={constraint.timeLimit}
                    onChange={handleChangeOnConstraint}
                    fullWidth
                    required
                />
                <TextField
                    margin='normal'
                    id='memoryLimit'
                    label="Enter Memory Limit Per Test Case in MB (MAX: 256MB)"
                    type='number'
                    name='memoryLimit'
                    value={constraint.memoryLimit}
                    onChange={handleChangeOnConstraint}
                    fullWidth
                    required
                />

                <Autocomplete
                    fullWidth
                    margin='auto'
                    multiple
                    id="tags-standard"
                    options={tags}
                    value={selectedTags}
                    onChange={handleTagsChange}
                    defaultValue={[tags[0]]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Problem Tags"
                            placeholder="Enter tags"
                        />
                    )}
                />

                <FormControl margin='normal'>
                    <FormLabel
                        id="Choose Difficulty">Choose Difficulty</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="Choose Difficulty"
                        defaultValue="easy"
                        name="difficulty"
                        value={data.difficulty}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                        <FormControlLabel value="easymedium" control={<Radio />} label="Easy Medium" />
                        <FormControlLabel value="hardMedium" control={<Radio />} label="Hard Medium" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                        <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                    </RadioGroup>
                </FormControl>


                <Box sx={{ marginTop: '15px', border: '1.5px solid #ddd' }}>
                    <Typography variant='body2' color='initial' style={{ margin: 'normal', padding: '0 25%' }}>
                        Enter Your Problem Statement Here .
                        <strong>Don't Forget to add input & output constraints <sup>*</sup></strong>
                    </Typography>
                    <TextEditor content={statement} handleContentChange={handleStatementChange} style={{ marginTop: '2px' }} />
                </Box>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}> Submit </Button>
            </Box>
        </Container>
    )
}
