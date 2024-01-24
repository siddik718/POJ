import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../../Components/TextEditor';

export const Updateblog = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(()=>{
    const fetchData = async()=> {
      try {
        const api = process.env.REACT_APP_BLOG_API + id;
        const response = await axios.get(api);
        setTitle(response.data.title);
        setContent(response.data.content);
      }catch(err) {
        console.log(err);
      }
    }
    fetchData();
  },[id]);
  const handleContentChange = (value) => {
      setContent(value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const api = process.env.REACT_APP_BLOG_API;
      try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.put(api + 'update', 
          { id, title, content });
          navigate("/community");
      } catch (err) {
          alert('Sorry try Again');
      }
  }
    return (
      <Container maxWidth='md'>
          <CssBaseline />
          <Box component='form' onSubmit={handleSubmit} sx={{
              marginTop: '70px'
          }}>
              <TextField
                  label="Enter the Title"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  sx={{
                      marginBottom: '5px',
                      paddingBottom: '5px'
                  }}
              />
              <TextEditor content={content} handleContentChange={handleContentChange}/>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Update</Button>
          </Box>
      </Container>
  )
};