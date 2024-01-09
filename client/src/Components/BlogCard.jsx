import React from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, Fab, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { FORMAT } from '../helper/DateReleted';
const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/community/view/${id}`);
    }
    const content = parse(blog.content);
    const subHeader = "By " + blog.username + " At " + FORMAT(blog.updatedAt);
    return (
        <Card variant="outlined" sx={{ margin: '16px',boxShadow: '-6px 6px 15px -5px rgba(28,59,120,1)' }} >
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: red[500] }}>
                    {blog.username[0].toUpperCase()}
                </Avatar>
            } action={
                <Tooltip title="Read More." arrow>
                    <Fab color="extended" aria-label="add" onClick={() => handleClick(blog._id)}>
                        <ReadMoreIcon />
                    </Fab>
                </Tooltip>

            } title={blog.title} subheader={subHeader}
            />
            <CardContent >
                <Box sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                    fontSize: '14px',
                    lineHeight: '1.5',
                    fontWeight: 500,
                    color: '#333',
                    padding: '5px'
                }}>
                    {content}
                </Box>
            </CardContent>
        </Card>
    )
}

export default BlogCard;