import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material'
import ContestInfo from '../../Components/ContestInfo';

export const AllcontestTwo = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const api = process.env.REACT_APP_CONTEST_API + "getALL";
        const response = await axios.get(api);
        console.log(response);
        setPast(response.data.past);
        setUpcoming(response.data.upcoming);
      } catch (err) {
        console.log(err);
      }
    }
    fetchContest();
  }, []);
  const navigate = useNavigate();
  const handleOnGoingClick = ( contestID )=> {
    console.log('On Going Contest ID : ',contestID);
    navigate(`/contest/${contestID}`);
  }
  const handlePastClick = ( contestID )=> {
    console.log('Past Contest ID : ',contestID);
    navigate(`/standing/${contestID}`)
  }
  return (
    <Container maxWidth="xl">
        <CssBaseline />
        <ContestInfo text1={"On Going or Upcomming Contests:"}
         text2={"Go To Contest"} contest={upcoming} handleClick={handleOnGoingClick} />
        <ContestInfo text1={"Recent Contests:"} text2={"Visit Standing"} contest={past} handleClick={handlePastClick}/>
    </Container>
  )
}
