import { Router } from "express";
import { login } from "../../controllers/admin/admin.auth.controller.js";

// Initialize Router
const router = Router();

// Admin Login Route
router.route("/login").post(login);


// Export router
export default router;