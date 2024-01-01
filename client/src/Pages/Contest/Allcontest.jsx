import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <div>
        <p> Ongoing Contests : </p>
        {upcoming && upcoming.map((con) => (
          <div key={con._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {con.title}
            </div>
            <div>
              <button onClick={() => navigate(`/contest/${con._id}`)} style={{ marginLeft: '10px' }}>Go To Contest</button>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <p>Past Contests: </p>
        {past && past.map((con) => (
          <div key={con._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:'5px 0' }}>
          <div >
            {con.title}
          </div>
          <div>
            <button onClick={() => navigate(`/standing/${con._id}`)} style={{ marginLeft: '10px' }}>Visit Standing</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}
