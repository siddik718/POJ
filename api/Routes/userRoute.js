import express from "express";
import { allUser, googleController, login,register,statistics,sayMyName, makeAdmin } from '../Controllers/userController.js'
const router = express.Router();

router.post("/login",login);
router.post("/register",register);
router.post("/googleAuth",googleController);
router.post("/makeAdmin",makeAdmin);

router.get('/me/:username',statistics);
router.get('/sayMyName/:id',sayMyName);
router.get('/',allUser);

export default router;