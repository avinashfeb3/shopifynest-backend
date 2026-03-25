import {Router} from 'express';
import { featuredProducts, getProduct, latestProducts } from '../controllers/product.controller.js';
import { getAllCategories } from '../controllers/admin/category.controller.js';
import { getAllSubCategories } from '../controllers/admin/subCategory.controller.js';
import { getAllBrand } from '../controllers/admin/brand.controller.js';

const router = Router();

router.route('/featured-products').get(featuredProducts);
router.route('/latest-products').get(latestProducts);
router.route('/get-products').get(getProduct);
router.route('/get-categories').get(getAllCategories);
router.route('/get-subcategories').get(getAllSubCategories);
router.route('/get-brands').get(getAllBrand);

export default router;
