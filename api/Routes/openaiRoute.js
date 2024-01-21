import express from 'express'
import { summerizeBlog, summerizeCode,summerizeStatement } from '../Controllers/openaiController.js';
const router = express.Router();


router.post('/summerizeCode',summerizeCode);
router.post('/summerizeStatement',summerizeStatement);
router.post('/summerizeBlog',summerizeBlog);


export default router;