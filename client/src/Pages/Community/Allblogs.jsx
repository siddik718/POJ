import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Container, CssBaseline, Grid, Typography, Tooltip, Pagination, Fab } from '@mui/material';
import BlogCard from '../../Components/BlogCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { LoadingPage } from '../../Components/LoadingPage';

export const Allblogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const api = process.env.REACT_APP_BLOG_API;
                const response = await axios.get(api);
                setBlogs(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBlogs();
    }, []);
    const nevigate = useNavigate();
    const handleAddButton = () => {
        nevigate('/community/create-blog');
    }
    // code for pageination.
    const [page, setPage] = useState(1); // current page.
    const pageSize = 3;
    const totalPages = Math.ceil(blogs.length / pageSize);
    // start index.
    const startIndex = (page - 1) * pageSize;
    // end index.
    const endIndex = Math.min(startIndex + pageSize - 1, blogs.length - 1);
    // get the current page blogs only.
    const blogsOnPage = blogs.slice(startIndex, endIndex + 1);
    const allBlogs = (
        <Container>
            <CssBaseline />
            <Box>
                <Grid container justifyContent="space-between" sx={{
                    padding: '10px 10px'
                }}>
                    <Grid item>
                        <Typography variant="h3" color="secondary">
                            Discussions
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Tooltip title="Add A New Discussion" arrow>
                            <Fab color="primary" aria-label="add" onClick={handleAddButton}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>

                {blogsOnPage.map((blog) => (
                    <Box key={blog._id} >
                        <BlogCard blog={blog} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
                <React.Fragment>
                    {blogs && allBlogs}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                        variant="outlined"
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </React.Fragment>
            )}
        </div>
    )
}
