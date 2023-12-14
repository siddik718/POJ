import { useContext, useState } from 'react'
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AuthContext from '../../Context/AuthContext';
import TextEditor from '../../Components/TextEditor';


export const Createblog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleContentChange = (value) => {
        setContent(value);
    };
    const { username, email } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = process.env.REACT_APP_BLOG_API;
        try {
            const response = await axios.post(api + 'register', { email, username, title, content });
            console.log(response);
            navigate("/community");
        } catch (err) {

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
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Publish</Button>
            </Box>
        </Container>
    )
};