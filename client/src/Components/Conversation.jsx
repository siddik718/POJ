// import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Typography, styled } from '@mui/material';
const TopBox = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    margin: '2px',
    padding: '8px',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'lightgray',
    },
    cursor: 'pointer',
})
const NoHoverIconButton = styled(IconButton)({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    marginRight:'10px',
    flex:2
})
const MyTypography = styled(Typography)({
    padding:'5px',
    flex:4
})
const Conversation = ({name}) => {
    return (
        <TopBox>
            <NoHoverIconButton aria-label="Friend">
                <PersonIcon />
            </NoHoverIconButton>
            <MyTypography variant="caption" color="teal" style={{ fontSize:'1em' }}>
                {name}
            </MyTypography>
        </TopBox>
    )
}

export default Conversation;