import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

const DialogBox = ({ openDialog, setOpenDialog, selectedSourceCode, answer }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const jsxContent = answer.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
            <DialogTitle>Source Code</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                            <Tooltip title="Copy to Clipboard">
                                <IconButton onClick={() => handleCopy(selectedSourceCode)} color="primary">
                                    <ContentCopyIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CodeMirror
                            value={selectedSourceCode}
                            height="400px"
                            width="100%"
                            theme="light"
                            style={{ border: '1px solid #ddd' }}
                            readOnly
                        />
                    </Box>
                    <Box sx={{ 
                        flex: 1,
                        overflowY:'scroll',
                        border: '1px solid #ddd',
                        margin: '10px',
                        marginTop:'35px',
                        height:'400px',
                        padding: '25px',
                }}>
                     <Typography variant="h6">Refactored Version of the Code With AI</Typography>
                        {jsxContent}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;
