import {Router} from 'express';
import { featuredProducts, latestProducts } from '../controllers/product.controller.js';

const router = Router();

router.route('/featured-products').get(featuredProducts);
router.route('/latest-products').get(latestProducts);

export default router;
