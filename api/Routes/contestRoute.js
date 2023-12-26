import express from 'express';
import { addProblem,getALL,getOne } from '../Controllers/contestController.js';

const router = express.Router();

router.post("/addproblem",addProblem);
router.get("/getALL",getALL);
router.get("/:id",getOne);

export default router;