import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,styled } from '@mui/material';
import React from 'react'
import { Duration, FORMAT } from '../helper/DateReleted';
const CustomTableCell = styled(TableCell)({
    color: '#333',
    border: '1px solid #dabbbb',
    opacity: '0.9',
    textAlign: 'center',
    width: '10%',
});
const CustomTableHead = styled(TableHead)({
    backgroundColor: '#e1d6d6',
})
const ContestInfo = ({ text1, text2,contest ,handleClick }) => {
    return (
        <TableContainer sx={{
            margin:'5px',
            padding: '5px',
        }}>
            <Typography variant="h6" component="div" color="mediumslateblue"> 
                {text1}
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