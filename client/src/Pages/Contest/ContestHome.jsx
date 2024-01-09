import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, CssBaseline, Fab, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

import { Allcontest } from './Allcontest';

const FirstBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  m: '5px'
})
const SecondBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  m: '5px'
})

export const ContestHome = () => {
  const navigate = useNavigate();
  const handleAddButton = () => {
      navigate('/add-contest');
  }

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <FirstBox>
        <Typography component="h2" variant='h5'>
          POJ Contests </Typography>
        <Tooltip title="Add A New Contest" arrow>
          <Fab color="primary" aria-label="add" onClick={handleAddButton}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </FirstBox>
      <SecondBox>
        <Allcontest />
      </SecondBox>
    </Container>
  )
}
