import { Link, Typography } from '@mui/material';
import React from 'react'
export const Footer = () => {
  return (
      <Typography 
        variant='body2'
        color="text.secondary"
        align='center'
        marginTop='auto'
      >
        {'Copyright © '}
        <Link color="inherit" href="/">POJ</Link>
        {' 2023 - '}{new Date().getFullYear()}{'.'}
      </Typography>
  )
}