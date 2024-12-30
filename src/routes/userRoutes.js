import express from "express";
import { createUser, handleUserSignin } from "../controllers/userController.js";
import { validateUser, validateSignin } from "../middleware/inputValidator.js";
const router = express.Router();



router.post("/signup", validateUser, createUser);
router.post("/signin", validateSignin, handleUserSignin);

export default router;
