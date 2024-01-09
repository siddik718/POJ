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
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const Oneproblem = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState('');
  console.log('ID : ', id);
  console.log('State : ', state);
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
    navigate(`/problems/submission/${id}`, { state: state });
  }
  const [openDialog, setOpenDialog] = useState(false);
  const [answer,setAnswer] = useState("");
  const handleSummerize = async () => {
    setOpenDialog(true);
    setAnswer("");
    try {
      const api = process.env.REACT_APP_OPEN_API + "summerizeStatement";

      const response = await fetch(api, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: statement }),
      });
      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        // console.log(decodedChunk)
        setAnswer((prev)=>prev+decodedChunk);
      }
      // const response = await axios.post(api,{statement});
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClose = () => {
    setOpenDialog(false);
  };
  const jsxContent = answer.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return (
    <Container maxWidth="xl">
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
          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sample Input:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {sampleInput && parseString(sampleInput)}
                </Typography>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={() => handleCopy(sampleInput)} color="primary">
                    <ContentCopyIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Sample Output:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {sampleOutput && parseString(sampleOutput)}
                </Typography>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={() => handleCopy(sampleOutput)} color="primary">
                    <ContentCopyIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          width: '100%',
          padding: '0 20%',
        }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        <Typography variant="body2" color="initial"> Or </Typography>
        <Button variant="contained" color="primary" onClick={handleSummerize}> Get Help From AI </Button>  
        </Box>
      </Box>

      

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Summery</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center',minWidth:'400px' }}>
              {jsxContent}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">Close</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};


function parseString(value) {
  const replacedValue = value.replace(/\\n/g, '\n');
  const linesArray = replacedValue.split('\n');
  const formattedValue = linesArray.join('<br />');
  return HTMLReactParser(formattedValue);
}