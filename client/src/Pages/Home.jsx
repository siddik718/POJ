import { Box, Container, Typography, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { FORMATDAYMONYEAR } from '../helper/DateReleted';

const StyledNavLink = styled(NavLink)`
  && {
    text-align: center;
    margin: 10px;
    text-decoration: none;
    padding: 15px;
    background-color: #3b73b9;
    color: #fff;
    border-radius: 7px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #000;
    }
  }
`;
const StyledNavLinkTwo = styled(NavLink)`
  && {
    text-align: center;
    margin: 10px;
    text-decoration: none;
    padding: 15px;
    color:#000;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #d7e3f3;
    }
  }
`;
const ContainerBox = styled(Box)({
  // border:'1px solid red',
  margin: '8px',
  padding: '5px',
  height: 'calc(100vh - 140px)',
})
const TopBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  // border : '1px solid black',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  margin: '5px',
})
const TopTypography = styled(Typography)({
  // border: '1px solid red',
  margin: '2px',
  padding: '5px',
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#000',
  letterSpacing:'5px',
})
const BottomTypography = styled(Typography)({
  width: '30%',
  // border: '1px solid red',
  padding: '5px',
  fontSize: '1.25rem',
  textAlign: 'center',
  color: '#000',
})
const NavLinkBox = styled(Box)({
  margin: '5px',
  // border: '1px solid red',
  padding: '15px',
})
const BottomBox = styled(Box)({
  // border: '1px solid red',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px',
  margin: '5px',
})
const BottomLeftBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  // border: '1px solid blue',
})
const BottomRightBox = styled(Box)({
  // border:'1px solid red',
  width: '50%',
  margin: '5px',
  padding: '5px',
})
const ContibutorBox = styled(Box)({
  padding: '5px',
  borderBottom: '1.5px solid #8181e1',
  // width: '30%',
})
const ContibutorTypography = styled(Typography)({
  fontSize: '1.245rem',
  fontWeight: '600',
  color: '#10692b',
  letterSpacing: '5px',
})
const ContibutorDataBox = styled(Box)({
  // border:'1px solid red',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  margin: '5px',
})
const UserNavLink = styled(NavLink)`
  && {
    border-bottom: 1px solid blue;
    text-decoration: none;
    color: #4a3f3f;
    margin: 3px 0;
    // width: 25%;
    transition: background-color 0.3s ease;
  }
`;
export const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const api = process.env.REACT_APP_USER_API;
        console.log(api);
        const response = await axios.get(api);
        console.log('Response data : ', response.data);
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);
  const { username } = useContext(AuthContext);
  const data1 = "Competitive Programming Training Gate";
  const data2 = "Learn, compete, and improve your competitive programming skills,for free on POJ.";
  return (
    <Container maxWidth='xl' >
      <ContainerBox>
        <TopBox >
          <TopTypography>
            {data1.toUpperCase()}
          </TopTypography>
          <BottomTypography>
            {data2.toUpperCase()}
          </BottomTypography>
          {username ? (<></>) : (
            <NavLinkBox>
              <StyledNavLink to="/signup" >
                Start Training Now For Free
              </StyledNavLink>
              <StyledNavLink to="/login" >
                Login
              </StyledNavLink>
            </NavLinkBox>
          )}
        </TopBox>
        <BottomBox >
          <BottomLeftBox>
            <StyledNavLinkTwo to="/contest">
              See All Contests..
            </StyledNavLinkTwo>
            <StyledNavLinkTwo to="/problems">
              See All Problems..
            </StyledNavLinkTwo>
          </BottomLeftBox>
          <BottomRightBox >
            <ContibutorBox>
              <ContibutorTypography>
                NEW USERS
              </ContibutorTypography>
            </ContibutorBox>
            <ContibutorDataBox>
              {users.length > 0 && users.map((user, index) => (
                <Box sx={{display:"flex", justifyContent: "space-between" }} key={index}>
                <UserNavLink to={`me/${user.username}`}>
                  #{index + 1}  {user.username}
                </UserNavLink>
                <Box>Joind On {FORMATDAYMONYEAR(user.createdAt)}</Box>
                </Box>
              ))}
            </ContibutorDataBox>
          </BottomRightBox>
        </BottomBox>
      </ContainerBox>
    </Container>
  );
};
