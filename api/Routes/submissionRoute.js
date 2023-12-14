import express from 'express';
import {  problemWise, userWise, allSubmisson, test } from '../Controllers/submissionController.js';

const router = express.Router();

router.get('/',allSubmisson);
router.get('/problem/:problemID',problemWise);
router.get('/me/:username',userWise);

router.post('/test',test);

export default router;