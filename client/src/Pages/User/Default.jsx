import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BarChart, DoughnutChart, PieChart } from '../../Components/Charts';
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { styled } from '@mui/system';

const MyBox = styled(Box)({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    height: '50vh', 
    margin: '15px 0',
    padding: '0 30px',
});

const MyInnerBox = styled(Box)({
  display:'flex',
  justifyContent:'center',
  alignItems: 'center',
  height:'100%'
});

export const Default = () => {
  const { username } = useContext(AuthContext);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_API + 'me/' + username);
        console.log(response.data);
        setStats(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllData();
  }, [username]);

  const data = [stats.AC, stats.WA, stats.CE, stats.RE];
  const labels = ['Accepted', 'Wrong Answer', 'Compilation Error', 'Run Time Error'];

  const dataTwo = [stats.EASY, stats.EASY_MEDIUM, stats.MEDIUM, stats.HARD_MEDIUM, stats.HARD];
  const labelsTwo = ['Easy', 'Easy Medium', 'Medium', 'Hard Medium', 'Hard'];

  const dataThree = [stats.CPP, stats.PYTHON, stats.JAVA];
  const labelsThree = ['C++', 'Python', 'Java'];
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box>

        <MyBox>
          <MyInnerBox>
            <Box>
            <Typography variant="h5" component='h5' color="primary">
              Username: {username}
            </Typography>
            <Typography variant="h5" component='h5' color="darkgray">
              disscuissions : {stats.blogs}
            </Typography>
            <Typography variant="h5" component='h5' color="success">
              submissions : {stats.submissions}
            </Typography>
            <Typography variant="h5" component='h5' color="success">
              solved : {stats.AC}
            </Typography>
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
