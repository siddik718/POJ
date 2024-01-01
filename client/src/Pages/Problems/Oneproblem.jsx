import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const Oneproblem = () => {
  const { id } = useParams();
  const {state} = useLocation();
  const [data, setData] = useState('');
  console.log('ID : ' , id);
  console.log('State : ' , state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PROBLEM_API}${id}`);
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.data);
      }
    };

    fetchData();
  }, [id]);

  const { title, statement, sampleInput, sampleOutput, timeLimit, memoryLimit } = data;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/problems/submission/${id}`,{state : state});
  }

  const handleSummerize = async () => {
    try {
      const api = process.env.REACT_APP_OPEN_API + "summerizeStatement";
      const response = await axios.post(api,{statement});
      console.log(response.data);
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          margin: '10px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography>Time limit per test: {timeLimit} seconds</Typography>
          <Typography>Memory limit per test: {memoryLimit / 1024} megabytes</Typography>
          <Typography>Input: Standard Input</Typography>
          <Typography>Output: Standard Output</Typography>
        </Paper>

        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h6">Problem Statement:</Typography>
          <Box variant="body1">{statement && HTMLReactParser(statement)} </Box>
        </Paper>

        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sample Input:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {sampleInput && parseString(sampleInput)}
                </Typography>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={() => handleCopy(sampleInput)} color="primary">
                    <ContentCopyIcon fontSize='small'/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sample Output:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {sampleOutput && parseString(sampleOutput)}
                </Typography>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={() => handleCopy(sampleOutput)} color="primary">
                    <ContentCopyIcon fontSize='small'/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

        <Button onClick={handleSummerize}> Give Me Hints </Button>


    </Container>
  );
};


function parseString(value) {
  const replacedValue = value.replace(/\\n/g, '\n');
  const linesArray = replacedValue.split('\n');
  const formattedValue = linesArray.join('<br />');
  return HTMLReactParser(formattedValue);
}