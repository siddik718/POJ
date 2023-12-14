import React from 'react'
import { Box, Stack, Skeleton } from '@mui/material';
export const LoadingPage = () => {
    return (
        <Box sx={{ m: 10 }}>
            <Stack spacing={1}>
                <Skeleton variant="rounded" width={'100%'} height='20vh' animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height='20vh' animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height='20vh' animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height='20vh' animation="wave" />
            </Stack>
        </Box>
    )
}
