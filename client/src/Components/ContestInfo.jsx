import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,styled } from '@mui/material';
import React from 'react'
import { Duration, FORMAT } from '../helper/DateReleted';
const CustomTableCell = styled(TableCell)({
    color: '#000',
    textAlign: 'center',
    width: '10%',
});
const CustomTableHead = styled(TableHead)({
    backgroundColor: '#feb552',
})
const ContestInfo = ({ text1, text2,contest ,handleClick }) => {
    return (
        <TableContainer sx={{
            margin:'10px',
            padding: '5px',
        }}>
            <Typography variant="h6" component="div" sx={{ color : '#15085f' }}> 
                {text1.toUpperCase()}
            </Typography>
            <Table>
            <CustomTableHead>
                <TableRow>
                <CustomTableCell>Start Time</CustomTableCell>
                <CustomTableCell>Contest Title</CustomTableCell>
                <CustomTableCell>Duration</CustomTableCell>
                <CustomTableCell>{text2}</CustomTableCell>
                </TableRow>
            </CustomTableHead>
            <TableBody>
                {contest && contest.map((con)=>(
                    <TableRow key={con._id} hover>
                        <CustomTableCell>{FORMAT(con.startTime)}</CustomTableCell>
                        <CustomTableCell>{con.title}</CustomTableCell>
                        <CustomTableCell>{Duration(con.endTime,con.startTime)}</CustomTableCell>
                        <CustomTableCell>
                            <Button onClick={()=>handleClick(con._id)}>
                                GO
                            </Button>
                        </CustomTableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ContestInfo;