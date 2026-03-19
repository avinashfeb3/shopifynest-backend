import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../../controllers/admin/products.controller.js";
import verifyJWT from "../../middleware/jwt.middleware.js";
import upload from "../../middleware/multer.middleware.js";

const router = Router();

router.route("/all").get(verifyJWT, getProducts);
router.route("/create").post(verifyJWT,upload.array("images"),createProduct);
router.route("/update/:id").put(verifyJWT, updateProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);
router.route("/:id").get(verifyJWT, getProduct);

export default router;