import express from 'express'
import { findMessages, sendMessage } from '../Controllers/messageController.js';

const router = express.Router();

router.post('/send',sendMessage);
router.get('/get',findMessages);

export default  router;