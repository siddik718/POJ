import { Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
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
  }, [id]);

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
  const [openDialog, setOpenDialog] = useState(false);
  const [answer,setAnswer] = useState("");
  const handleSummerizePost = async () => {
    // console.log('Tipis na');
    setOpenDialog(true);
    setAnswer("");
    try {
      const api = process.env.REACT_APP_OPEN_API + "summerizeBlog";
      // console.log("API : ",api)
      // console.log(blog && "OK");
      const response = await fetch(api, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: blog?.content }),
      });
      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        // console.log(decodedChunk)
        setAnswer((prev)=>prev+decodedChunk);
      }
      // const response = await axios.post(api,{statement});
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleClose = () => {
    setOpenDialog(false);
    setAnswer("");
  };
  const jsxContent = answer.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
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

      <Button variant="outlined" color="primary" onClick={handleSummerizePost}>Summerize The Post With AI</Button>
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

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Summery</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center',minWidth:'400px' }}>
              {jsxContent}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">Close</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
