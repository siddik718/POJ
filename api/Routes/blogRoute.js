import express from 'express';
import { allBlog,oneBlog,getMyBlogs,register,remove,update,addComment } from '../Controllers/blogController.js';

const router = express.Router();

router.get('/',allBlog);
router.get('/myblogs/:email',getMyBlogs);
router.get('/:id',oneBlog);
router.post('/register',register);
router.delete('/:id',remove);
router.put('/update',update);
router.post('/comment/:id',addComment);

export default router;