import express from 'express';
import { addContest,getALL,getOne } from '../Controllers/contestController.js';

const router = express.Router();

router.post("/add",addContest);
router.get("/getALL",getALL);
router.get("/:id",getOne);

export default router;