import express from "express";
import { allUser, googleController, login,register,statistics,sayMyName } from '../Controllers/userController.js'
const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.get('/me/:username',statistics);
router.post("/googleAuth",googleController);
router.get('/sayMyName/:id',sayMyName);
router.get('/',allUser);

export default router;