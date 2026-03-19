import { Router } from "express";
import { login, register } from "../controllers/user.auth.controller.js";

// intailze Router
const router = Router();

// Routes
router.route("/register").post(register);
router.route("/login").post(login);

export default router;