import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BarChart, DoughnutChart, PieChart } from '../../Components/Charts';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material'
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom'
const MyBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50vh',
  margin: '15px 0',
  padding: '0 30px',
  boxShadow: '-6px 6px 15px -5px rgba(28,59,120,1)'
});

const MyInnerBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flex:'6',
  padding: '5px 0',
});

export const Default = () => {
  const currentUserProfile = useParams().id;
  const { username } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_API + 'me/' + currentUserProfile);
        setStats(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllData();
  }, [currentUserProfile]);

  const data = [stats.AC, stats.WA, stats.CE, stats.RE];
  const labels = ['Accepted', 'Wrong Answer', 'Compilation Error', 'Run Time Error'];

  const dataTwo = [stats.EASY, stats.EASY_MEDIUM, stats.MEDIUM, stats.HARD_MEDIUM, stats.HARD];
  const labelsTwo = ['Easy', 'Easy Medium', 'Medium', 'Hard Medium', 'Hard'];

  const dataThree = [stats.CPP, stats.PYTHON, stats.JAVA];
  const labelsThree = ['C++', 'Python', 'Java'];

  const navigate = useNavigate();
  const handleSendClick = (ID) => {
    navigate(`/message/${ID}`);
  }
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box>
        <MyBox>
          <MyInnerBox>
            <Box>
              <Typography variant="h5" component='h5' color="primary">
                Username: {currentUserProfile}
              </Typography>
              <Typography variant="h5" component='h5' color="darkgray">
                Disscuissions : {stats.blogs}
              </Typography>
              <Typography variant="h5" component='h5' color="darkgray">
                Submissions : {stats.submissions}
              </Typography>
              <Typography variant="h5" component='h5' color="darkgray">
                Accepted : {stats.AC}
              </Typography>
              {currentUserProfile !== username &&
                <Button variant="outlined" color="primary" onClick={() => handleSendClick(stats.ID)}>
                  Send Message
                </Button>}
            </Box>
          </MyInnerBox>
          <MyInnerBox>
            <PieChart data={dataThree} labels={labelsThree} />
          </MyInnerBox>
        </MyBox>

        <MyBox >
          <MyInnerBox >
            <BarChart data={data} labels={labels} />
          </MyInnerBox>
          <MyInnerBox>
            <DoughnutChart data={dataTwo} labels={labelsTwo} />
          </MyInnerBox>
        </MyBox>
      </Box>
    </Container>
  )
}
