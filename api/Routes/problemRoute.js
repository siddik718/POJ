import express from 'express';
import { addProblem ,allProblem,getByName,oneProblem } from '../Controllers/problemController.js';


const router = express.Router();

router.get('/',allProblem);
router.get('/getByName',getByName);
router.get('/:id',oneProblem);
router.post('/add-problem',addProblem);


export default router;