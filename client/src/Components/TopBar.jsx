import { Box, Fab, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
const TopBar = ({navigationLocation , headingContent, toolTipTitle }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '5px' }}>
            <Typography component="h2" variant='h5'>
                {headingContent} </Typography>
            <Tooltip title={toolTipTitle} arrow>
                <Fab color="primary" aria-label="add" onClick={() => navigate(navigationLocation)}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    )
}

export default TopBar;