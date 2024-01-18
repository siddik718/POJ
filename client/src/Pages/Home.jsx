import { Box, Container, Typography, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

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
      background-color: #215db0;
    }
  }
`;
const StyledNavLinkTwo = styled(NavLink)`
  && {
    text-align: center;
    margin: 10px;
    text-decoration: none;
    padding: 15px;
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
  color: '#2c2c9e',
})
const BottomTypography = styled(Typography)({
  width: '30%',
  // border: '1px solid red',
  padding: '5px',
  fontSize: '0.95rem',
  textAlign: 'center',
  color: '#2c2c93',
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
  color: '#8181e1',
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
  return (
    <Container maxWidth='xl' >
      <ContainerBox>
        <TopBox >
          <TopTypography>
            Competitive Programming Training Gate
          </TopTypography>
          <BottomTypography>
            Learn, compete, and improve
            your competitive programming skills,
            for free on POJ.
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
                Top Contributors
              </ContibutorTypography>
            </ContibutorBox>
            <ContibutorDataBox>
              {users.length > 0 && users.map((user, index) => (
                <UserNavLink key={index} to={`me/${user.username}`}>
                  #{index + 1}  {user.username}
                </UserNavLink>
              ))}
            </ContibutorDataBox>
          </BottomRightBox>
        </BottomBox>
      </ContainerBox>
    </Container>
  );
};
