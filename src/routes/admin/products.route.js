import { Router } from "express";
import { createProduct, deleteProduct, deleteProductImage, getProduct, getProducts, updateGallery, updateProduct } from "../../controllers/admin/products.controller.js";
import verifyJWT from "../../middleware/jwt.middleware.js";
import upload from "../../middleware/multer.middleware.js";

const router = Router();

router.route("/all").get(verifyJWT, getProducts);
router.route("/create").post(verifyJWT,upload.array("images"),createProduct);
router.route("/update/:id").put(verifyJWT, upload.array("images"),updateProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);
router.route("/:id").get(verifyJWT, getProduct);
router.route("/update-gallery/:id").put(verifyJWT, upload.array("images"),updateGallery);
router.route("/delete-image/:id/:public_id").delete(verifyJWT, deleteProductImage);

export default router;