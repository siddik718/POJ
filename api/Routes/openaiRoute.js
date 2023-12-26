import express from 'express'
import { summerizeCode,summerizeStatement } from '../Controllers/openaiController.js';
const router = express.Router();


router.post('/summerizeCode',summerizeCode);
router.post('/summerizeStatement',summerizeStatement);


export default router;