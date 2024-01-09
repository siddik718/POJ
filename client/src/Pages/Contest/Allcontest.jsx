import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FORMAT } from '../../helper/DateReleted';

export const Allcontest = () => {
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
  return (
    <div className='all-contest-page'>
      <div className='half-contest-page'>
        <p> Ongoing Contests : </p>
        {upcoming && upcoming.map((con) => (
          <div key={con._id} className='contest-details'>
            <div>
              {con.title}
            </div>
            <div>{con.startTime}</div>
            <div>
              <button onClick={() => navigate(`/contest/${con._id}`)} className='standing-go-btn'>Go To Contest</button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className='half-contest-page'>
        <p>Past Contests: </p>
        {past && past.map((con) => (
          <div key={con._id} className='contest-details'>
          <div >
            {con.title}
          </div>
          <div>Ended AT : {FORMAT(con.endTime)}</div>
          <div>
            <button onClick={() => navigate(`/standing/${con._id}`)} className='standing-go-btn'>Visit Standing</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}
