import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, IconButton, Pagination, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FORMAT } from '../helper/DateReleted';
export const SubmissionTable = ({ submissions }) => {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(submissions.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, submissions.length);

    const submissionOnThisPage = submissions.slice(startIndex, endIndex + 1);

    const [selectedSourceCode, setSelectedSourceCode] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const [answer, setAnswer] = useState("");
    const handleClickOpen = async (sourceCode) => {
        setSelectedSourceCode(sourceCode);
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
                console.log(decodedChunk)
                setAnswer((prev) => prev + decodedChunk);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };
    const navigate = useNavigate();
    const handleUserClick = (username) => {
        console.log(username);
        // navugate()
        navigate(`/me/${username}`);
    }
    const jsxContent = answer.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
    const displaySub = (
        <Box sx={{ m: '5px' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Title</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Difficulty</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Username</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Judge Time</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Verdict</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} >Language</TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5', color: '#333' }} ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissionOnThisPage.map((sub) => (
                            <TableRow key={sub._id}>
                                <TableCell>{sub.submissionID}</TableCell>
                                <TableCell>{sub.title}</TableCell>
                                <TableCell>{sub.difficulty}</TableCell>
                                <TableCell onClick={() => handleUserClick(sub.username)} className='pointer'>{sub.username}</TableCell>
                                <TableCell>{FORMAT(sub.updatedAt)}</TableCell>
                                <TableCell>{sub.status}</TableCell>
                                <TableCell>{sub.language}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleClickOpen(sub.sourceCode)}>
                                        Show Source
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Source Code</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex',width:'100%' }}>
                        <Box sx={{ width:'50%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <Tooltip title="Copy to Clipboard">
                                    <IconButton onClick={() => handleCopy(selectedSourceCode)} color="primary" >
                                        <ContentCopyIcon fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <CodeMirror
                                value={selectedSourceCode}
                                height="100%"
                                width="100%"
                                theme="light"
                                style={{ border: '1px solid red' }}
                                readOnly
                            />
                        </Box>
                        <Box sx={{width:'50%'}}>{jsxContent}</Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
            {displaySub}
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                variant="outlined" color="primary"
                showFirstButton showLastButton
            />
        </div>
    );
};