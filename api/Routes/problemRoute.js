import express from 'express';
import { addProblem ,allProblem,oneProblem } from '../Controllers/problemController.js';


const router = express.Router();

router.get('/',allProblem);
router.get('/:id',oneProblem);
router.post('/add-problem',addProblem);


export default router;