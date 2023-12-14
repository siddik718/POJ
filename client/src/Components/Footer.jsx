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

    <Link color="inherit" href="/">
        PHub
    </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}