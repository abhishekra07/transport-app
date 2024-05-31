import express from "express";
import { registerUser, loginUser, refreshToken } from "../controller/users.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;
