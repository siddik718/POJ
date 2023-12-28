import express from 'express'
import { findMessages, saveMessage } from '../Controllers/messageController.js';

const router = express.Router();

router.post('/',saveMessage);
router.get('/:conversationId',findMessages);

export default  router;