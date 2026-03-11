import express from 'express';

const router = express.Router();

import {
    getProducts,
    getProduct,
    getCart,
    getCheckOut
} from '../controllers/shop'

router.get('/',getProducts);
router.get('/products',getProducts);
router.get('/products/:productId',getProduct);
router.get('/cart',getCart);
router.get('/checkout',getCheckOut);

export default router;
