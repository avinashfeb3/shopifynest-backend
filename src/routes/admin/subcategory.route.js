import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategories, updateSubCategory } from "../../controllers/admin/subCategory.controller.js";
import verifyJWT from "../../middleware/jwt.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT,createSubCategory);
router.route("/update/:id").put(verifyJWT, updateSubCategory);
router.route("/:id").post(verifyJWT, updateSubCategory);
router.route("/:id").delete(verifyJWT, deleteSubCategory);
router.route("/:id").get(verifyJWT,getSubCategories);
router.route("/").get(verifyJWT, getAllSubCategories);

export default router;