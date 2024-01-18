import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Container, CssBaseline, Typography, styled } from '@mui/material'
const TopBox = styled(Box)({
  padding: '5px',
  margin: '5px',
})
const ProblemBox = styled(Box)({
  margin: '5px',
  padding: "10px",
  borderRadius: '12px',
  '&:hover':{
    backgroundColor: '#f2f6ff',
  },
})
const ProblemTypography = styled(Typography)({
  fontSize: '1.025rem',
  color: '#303133',
  cursor:'pointer',
})

const Dashboard = ({ problems,contestID }) => {
  const navigate = useNavigate();
  const handleClick = async (title,index)=>{
    try {
      const api = process.env.REACT_APP_PROBLEM_API + "/getByName";
      const res = await axios.get(api,{
        params: {title}
      })
      const data = {
        problemNO: index,
        contestID,
      }
      navigate(`/contest-problems/${res.data._id}`,{ state: data});
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <TopBox>
        {problems && problems.length > 0 && problems.map((problem,index)=>(
          <ProblemBox key={index}>
            <ProblemTypography onClick={()=>handleClick(problem,index)}>
              Problem #{index + 1} : {problem}
            </ProblemTypography>
          </ProblemBox>
        ))}
      </TopBox>
    </Container>
  )
}

export default Dashboard