import { Box, Link, Typography } from '@mui/material';
import React from 'react'
export const Footer = () => {
  return (
    <Box sx={{
      marginTop:'auto',
      minHeight:'60px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems: 'center',
    }}>
      <Typography 
        variant='body2'
        color="text.secondary"
        align='center'
        >
        {'Copyright © '}
        <Link color="inherit" href="/">POJ</Link>
        {' 2023 - '}{new Date().getFullYear()}{'.'}
      </Typography>
      <Typography         
        variant='body2'
        color="text.secondary"
        align='center'>
      Server Time: {new Date().toUTCString()}
      </Typography>
        </Box>
  )
}