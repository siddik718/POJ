import React, { useContext, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Alert, Backdrop, Box, Button, CircularProgress, Collapse, Container, CssBaseline, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AuthContext from '../../Context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { StoreProblem, getVerdict, haveProblem } from '../../helper/contestHelper';

export const Submission = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [source_code, setSource_code] = useState('print ("Hello World"); ');
  const onChange = (val, viewUpdate) => {
    setSource_code(val);
  };
  console.log('State : ', state);
  const [language, setLanguage] = useState('PYTHON3');
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const [loading, setLoding] = useState(false);
  const [result, setRuslt] = useState("");
  const [open, setOpen] = useState(true);

  const { username } = useContext(AuthContext);
  const handleSubmit = async () => {
    try {
      setLoding(true);
      const api = process.env.REACT_APP_SUBMISSION_API;
      // console.log(username,source_code,language,id,api);
      const res = await axios.post(api + "test/", {
        username, source_code, language, id
      });
      setOpen(true);
      setLoding(false);
      setRuslt(res.data.responseTwo.description);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (state === null || result === "") return;

    // check if this problem is already a accepted problem.
    console.log('problemNo : ', state.problemNO)
    if (haveProblem(state.problemNO) && getVerdict(state.problemNO) === 'Accepted') {
      console.log('problemNo inSide: ', state.problemNO)
      return;
    }
    console.log('problemNo outSide: ', state.problemNO)
    StoreProblem(state.problemNO, result);

    const submitToContest = async () => {
      const api = process.env.REACT_APP_STANDING_API;
      const r = await axios.post(api, { score: result === 'Accepted' ? 1 : 18000, username, contestID: state.contestID });
      console.log('After Submitted To Contest : ', r);
    }
    submitToContest();
  }, [result, state, username])

  const showResult = (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {result}
      </Alert>
    </Collapse>
  )
  return (
    <Container>
      <CssBaseline />

      <Box sx={{ maxWidth: '80%', margin: '10px', padding: '10px' }}>
        <Box sx={{ maxWidth: '100%', padding: '10px' }}>
          {result && showResult}
          <Typography variant="body2" color="textSecondary" style={{margin:'10px',fontWeight:700}}>
                  For Java Your main method should be inside 'public class Main'
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="Select-Language">Select Language</InputLabel>
            <Select
              labelId="Select-Language"
              id="Select-Language"
              value={language}
              label="Select-Language"
              onChange={handleChange}
            >
              <MenuItem value="PYTHON3">Python 3</MenuItem>
              <MenuItem value="CPP17">C++ 17</MenuItem>
              <MenuItem value="JAVA8">Java 8</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: '50%', margin: '5px', padding: '5px' }}>
          <CodeMirror
            value={source_code}
            height="400px"
            width="100%"
            theme="light"
            style={{ border: '1px solid red' }}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ maxWidth: '100%', padding: '10px' }}>
          <Button color="secondary" size="medium" variant="outlined" type='submit' onClick={handleSubmit} fullWidth>
            Submit
          </Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Box>
    </Container>
  );
}
