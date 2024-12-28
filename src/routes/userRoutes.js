import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, handleUserSignin } from "../controllers/userController.js";
import { validateUser, validateSignin } from "../middleware/inputValidator.js";
const router = express.Router();



router.post("/signup", validateUser, createUser);
router.post("/signin", validateSignin, handleUserSignin);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", validateUser, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
