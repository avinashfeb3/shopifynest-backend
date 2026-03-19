import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategories, updateCategory } from "../../controllers/admin/category.controller.js";
import verifyJWT from "../../middleware/jwt.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createCategory);
router.route("/update/:id").put(verifyJWT, updateCategory);
router.route("/:id").delete(verifyJWT, deleteCategory);
router.route("/:id").get(verifyJWT,getCategories);
router.route("/").get(verifyJWT, getAllCategories);

export default router;