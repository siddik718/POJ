import { Box, Button, Container, CssBaseline, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import CommentIcon from '@mui/icons-material/Comment';
import TextEditor from '../../Components/TextEditor'
import AuthContext from '../../Context/AuthContext';
import Comments from '../../Components/Comments';

export const Oneblog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const { username } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = process.env.REACT_APP_BLOG_API;
        const response = await axios.get(api + id);
        setBlog(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error.data);
      }
    }
    fetchData();
  }, [comments]);

  const [content, setContent] = useState('');
  const handleContentChange = (value) => {
    setContent(value);
  };
  const handleCommentPost = async () => {
    console.log(content);
    try {
      const api = process.env.REACT_APP_BLOG_API + "comment/" + id;
      const response = await axios.post(api, { id, username, comment: content });
      setComments((prevComments) => [...prevComments, response.data.comments]);
      setContent('');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <CssBaseline />
      <Typography
        component='h3'
        variant='h4'
        fontWeight='bold'
        sx={{ marginTop: '15px', marginBottom: '10px', color: '#333' }}
      >
        {blog?.title}
      </Typography>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '8px' }}>
        By {blog.username}, Last Modification {new Date(blog.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
      </Typography>

      <Box sx={{
        fontSize: '15px', marginTop: '25px', padding: '2px',
        border: '1.5px solid #ddd', borderRadius: '20px'
      }} >
        <Box sx={{ padding: '15px' }}>
          {blog.content && HTMLReactParser(blog.content)}
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #ddd', margin: '5px 0', borderRadius: '20px', padding: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CommentIcon color='grey' fontSize='small' style={{ paddingRight: '5px' }} />
        <Typography variant="body2" color="#333">
          Comments : {Array.isArray(comments) ? comments.length : 0}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '20px',
      }}>
        <Box sx={{ marginRight: '10px' }}>
          <TextEditor content={content} handleContentChange={handleContentChange} style={{ margin: '10px' }} />
        </Box>
        <Box >
          <Button type='submit' variant='contained' sx={{
            m: '2px', width: '20%'
          }} onClick={handleCommentPost}>Post</Button>
        </Box>
      </Box>
      {comments.length > 0 && <Comments comments={comments} />}
    </Container>
  );
}
