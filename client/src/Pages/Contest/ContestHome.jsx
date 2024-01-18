import React, { useContext } from 'react'
import { Box, Container, CssBaseline } from '@mui/material'
import { styled } from '@mui/system';
import { AllcontestTwo } from './AllContestTwo';
import TopBar from '../../Components/TopBar';
import AuthContext from '../../Context/AuthContext';
const SecondBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  m: '5px'
})
export const ContestHome = () => {
  const { isAdmin } = useContext(AuthContext);
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <TopBar
        navigationLocation={"/add-contest"} headingContent={"POJ Contests"}
        toolTipTitle={"Add A New Contest"} isAdmin={isAdmin}
      />
      <SecondBox>
        <AllcontestTwo />
      </SecondBox>
    </Container>
  )
}
