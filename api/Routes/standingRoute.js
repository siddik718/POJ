import express from 'express';
import { save, stand } from '../Controllers/standingController.js';


const router = express.Router();

router.post('/',save);
router.get('/',stand);


export default router;