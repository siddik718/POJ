import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardHeader, Container, CssBaseline, Fab, Pagination, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LoadingPage } from '../../Components/LoadingPage';

export const Allproblem = () => {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const fetchProblems = async () => {
      const response = await axios.get(process.env.REACT_APP_PROBLEM_API);
      setProblems(response.data.problems);
      setLoading(false);
      console.log(response.data);
    }
    fetchProblems();
  }, []);
  const navigate = useNavigate();
  const handleBox = ({ id }) => {
    navigate(`/problems/${id}`);
  }
  const handleAddButton = () => {
    navigate('/add-problem');
  }
  // code for pagination .. 
  const [page, setPage] = useState(1); // current page.
  const pageSize = 50;
  const totalPages = Math.ceil(problems.length / pageSize);
  // start index.
  const startIndex = (page - 1) * pageSize;
  // end index.
  const endIndex = Math.min(startIndex + pageSize - 1, problems.length - 1);
  // get the current page problems only.
  const problemsOnPage = problems.slice(startIndex, endIndex + 1);

  // code end for pageination..
  const showProblems = (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}
    >
      {problemsOnPage.map((problem) => (
        <Box key={problem._id} sx={{ padding: '5px', margin: '10px', width: '100%', }} >
          <Card>
            <CardHeader
              action={
                <Button
                  size="medium"
                  variant="outlined"
                  color='primary'
                  onClick={() => handleBox({ id: problem._id })}
                >
                  Solve
                </Button>
              }
              title={problem.title}
              subheader={problem.selectedTags}
            />
          </Card>
        </Box>
      ))}
    </Box>
  );


  const noProblems = <div className="no-problems">
    <Typography>Sorry No Problem Currently! </Typography>
  </div>

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  return (
      <Container maxWidth='lg'>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '5px' }}>
          <Typography component="h2" variant='h5'>
            POJ Problemsets </Typography>
          <Tooltip title="Add A New Problem" arrow>
            <Fab color="primary" aria-label="add" onClick={handleAddButton}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        {loading ? <LoadingPage /> :  problems ? showProblems : noProblems}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          variant="outlined" color="primary"
          showFirstButton showLastButton
        />
      </Container>
  )
}
