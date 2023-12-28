import express from 'express'
import { findConversation, saveConversation } from '../Controllers/conversationController.js'
const router = express.Router();

router.post('/',saveConversation);
router.get('/',findConversation);

export default router;