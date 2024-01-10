import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Container, CssBaseline,Pagination} from '@mui/material';
import BlogCard from '../../Components/BlogCard';
import { LoadingPage } from '../../Components/LoadingPage';
import TopBar from '../../Components/TopBar';

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
                <TopBar
                    navigationLocation={"/community/create-blog"} headingContent={"POJ Discussions"}
                    toolTipTitle={"Add A New Discussion"}
                />

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
