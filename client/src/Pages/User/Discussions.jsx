import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/AuthContext';
import { Box, Container, CssBaseline, Fab, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Discussions = () => {
    const [blogs, setBlogs] = useState([]);
    const { email } = useContext(AuthContext);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const api = process.env.REACT_APP_BLOG_API;
                const response = await axios.get(api + `myblogs/${email}`);
                setBlogs(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBlogs();
    }, [email]);
    const navigate = useNavigate();
    const handleAddButton = () => {
        navigate('/community/create-blog');
    }
    const handleEditButton = (id) => {
        // console.log(id);
        navigate(`/community/update/${id}`);
    }
    const handleDeleteButton = async (id) => {
        try {
            const api = process.env.REACT_APP_BLOG_API + id;
            const response = await axios.delete(api);
            alert(response.data.message);

        } catch (err) {
            console.log(err);
        }
    }
    const allBlogs = (
        <Container>
            <CssBaseline />
            <Box>
                <Grid container justifyContent="space-between" sx={{ padding: '10px 10px' }}>
                    <Grid item>
                        <Typography variant="h3" color="secondary"> My Discussions </Typography>
                    </Grid>
                    <Grid item >
                        <Tooltip title="Add A New Discussion" arrow>
                            <Fab color="primary" aria-label="add" onClick={handleAddButton}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
                {blogs.map((blog) => (
                    <Box key={blog._id}  >
                        <Box sx={{
                            color: '#333',
                            padding: '5px',
                            border: '1px solid #444',
                            height: '10vh',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '20px',
                            marginBottom: '5px',
                            transition: 'background-color 0.8s ease',
                            '&:hover':{
                                backgroundColor:'#edd7d7',
                                cursor:'pointer',
                            },
                        }}>
                            <Tooltip title="Update Discussion" arrow>
                                <IconButton onClick={() => handleEditButton(blog._id)} color="primary">
                                    <ModeEditOutlineTwoToneIcon fontSize="medium" color="primary" />
                                </IconButton>
                            </Tooltip>
                            {blog.title}
                            <Tooltip title="Delete Discussion" arrow>
                                <IconButton onClick={() => handleDeleteButton(blog._id)} color="Warning">
                                    <DeleteTwoToneIcon fontSize="medium" color="warning" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
    return (
        <div>
            {blogs && allBlogs}
        </div>
    )
};