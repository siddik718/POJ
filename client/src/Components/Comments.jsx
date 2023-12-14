import { Box, Pagination, Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Comments = ({ comments }) => {
    const [page, setPage] = useState(1); // current Page
    const pageSize = 5; // comment limit per page 

    // Calculate the total number of pages
    const totalPages = Math.ceil(comments.length / pageSize);

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, comments.length - 1);

    // Get the comments for the current page
    const commentsOnPage = comments.slice(startIndex, endIndex + 1);
    
    // get all the comments of current page
    const allComments = (commentsOnPage.map((com) => (
        <Box key={com._id} sx={{ border: '1px solid #ddd', borderRadius: '20px', marginBottom: '5px' }}>
            <Box sx={{ m: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <AccountCircleIcon />
                <Typography variant="body2" color="#333" marginLeft={'5px'}>
                    {com.username}  At {new Date(com.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </Typography>
            </Box>
            <Box sx={{
                margin: '0 10px 5px',
                padding: '0 30px 5px',
                font: 'message-box'
            }}>
                {com.comment && HTMLReactParser(com.comment)}
            </Box>
        </Box>
    )));
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    return (
        <Box sx={{ m: '10px 0' }}>
            {allComments}
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                variant="outlined" color="primary"
                showFirstButton showLastButton
            />
        </Box>
    )
}

export default Comments;