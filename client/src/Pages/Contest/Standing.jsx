import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'

const CustomTableCell = styled(TableCell)({
  color: '#000',
  textAlign: 'center',
  width: '33%',
})
const CustomTableHead = styled(TableHead)({
  backgroundColor: '#feb552',
})

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
    <TableContainer>
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell>RANK</CustomTableCell>
            <CustomTableCell>USERNAME</CustomTableCell>
            <CustomTableCell>PENALTY</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {standings.length > 0 && standings.map((standing,index)=>(
            <TableRow key={standing._id} hover sx={{
              backgroundColor: index === 0 && '#a4a4f2',
            }}>
              <CustomTableCell>{index + 1}</CustomTableCell>
              <CustomTableCell>{standing.username}</CustomTableCell>
              <CustomTableCell sx={{
                color: standing.score >= 0 ? 'blue' : 'red'
              }}>{standing.score}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Standing;