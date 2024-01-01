import express from 'express';
import { addContest,getALL,getOne, isAnyRunningNow } from '../Controllers/contestController.js';

const router = express.Router();

router.get('/now',isAnyRunningNow);
router.get("/getALL",getALL);
router.get("/:id",getOne);
router.post("/add",addContest);

export default router;