import express from 'express';
import { addContest,getALL,getOne, isAnyRunningNow } from '../Controllers/contestController.js';
import { isAdmin } from '../Middlewires/adminRelated.js';

const router = express.Router();

router.get('/now',isAnyRunningNow);
router.get("/getALL",getALL);
router.get("/:id",getOne);
router.post("/add",isAdmin,addContest);

export default router;