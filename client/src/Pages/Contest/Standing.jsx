import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Standing = ({ contestID }) => {
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    const fetchStanding = async () => {
      try {
        const api = process.env.REACT_APP_STANDING_API;
        const res = await axios.get(api, {
          params: { contestID: contestID },
        });
        setStandings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStanding();
  }, [contestID]);
  return (
    <div>
      <h2>Standings</h2>
      <table style={{ width:'100%' }}>
        <thead>
          <tr className='space-between'>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {standings.length > 0 && standings.map((standing, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{standing.username}</td>
              <td>{Math.max(standing.score,0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Standing;