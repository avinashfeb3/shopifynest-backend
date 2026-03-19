import { Router } from "express";
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "../../controllers/admin/brand.controller.js";
import verifyJWT from "../../middleware/jwt.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT,createBrand);
router.route("/update/:id").put(verifyJWT, updateBrand);
router.route("/:id").delete(verifyJWT, deleteBrand);
router.route("/:id").get(verifyJWT,getBrand);
router.route("/").get(verifyJWT, getAllBrand);

export default router;