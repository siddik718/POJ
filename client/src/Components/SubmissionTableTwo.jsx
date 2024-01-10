import React, { useState } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { FORMAT } from '../helper/DateReleted'
import { useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
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

const SubmissionTableTwo = ({ submissions }) => {

    // pageination related work start.
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(submissions.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, submissions.length);
    const submissionOnThisPage = submissions.slice(startIndex, endIndex + 1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    // pageination related work end.

    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSourceCode, setSelectedSourceCode] = useState('');
    const [answer, setAnswer] = useState("");
    const handleClickOpen = async (source) => {
        setSelectedSourceCode(source);
        setOpenDialog(true);
        setAnswer("");
        try {
            const api = process.env.REACT_APP_OPEN_API + "summerizeCode";
            const response = await fetch(api, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userPrompt: selectedSourceCode }),
            });
            if (!response.ok || !response.body) {
                throw new Error(response.statusText);
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                const decodedChunk = decoder.decode(value, { stream: true });
                // console.log(decodedChunk)
                setAnswer((prev) => prev + decodedChunk);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <TableContainer>
                <Table >
                    <CustomTableHead>
                        <TableRow>
                            <CustomTableCell>ID</CustomTableCell>
                            <CustomTableCell colSpan={2}>Problem</CustomTableCell>
                            <CustomTableCell>Difficulty</CustomTableCell>
                            <CustomTableCell>Username</CustomTableCell>
                            <CustomTableCell>Judge Time</CustomTableCell>
                            <CustomTableCell>Status</CustomTableCell>
                            <CustomTableCell>Language</CustomTableCell>
                            <CustomTableCell>Source</CustomTableCell>
                        </TableRow>
                    </CustomTableHead>
                    <TableBody>
                        {submissionOnThisPage.length > 0 && submissionOnThisPage.map((sub) => (
                            <TableRow key={sub._id} hover>
                                <CustomTableCell>{sub.submissionID}</CustomTableCell>
                                <CustomTableCell colSpan={2}>{sub.title}</CustomTableCell>
                                <CustomTableCell>{sub.difficulty}</CustomTableCell>
                                <CustomTableCell className='pointer' onClick={() => navigate(`/me/${sub.username}`)}>{sub.username}</CustomTableCell>
                                <CustomTableCell>{FORMAT(sub.updatedAt)}</CustomTableCell>
                                <CustomTableCell sx={{ color: sub.status === 'Accepted' ? 'blue' : 'red' }}>{sub.status}</CustomTableCell>
                                <CustomTableCell>{sub.language}</CustomTableCell>
                                <CustomTableCell>
                                    <Button onClick={() => handleClickOpen(sub.sourceCode)}>Source</Button>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogBox openDialog={openDialog} setOpenDialog={setOpenDialog} selectedSourceCode={selectedSourceCode} answer={answer} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                variant="outlined" color="primary"
                showFirstButton showLastButton
            />
        </>
    )
}

export default SubmissionTableTwo;