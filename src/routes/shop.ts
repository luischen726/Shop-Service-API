import express from 'express';

const router = express.Router();

import {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    // getCheckOut,
    postCart,
    postCartDeleteProduct
} from '../controllers/shop'


router.get('/',getIndex);
router.get('/products',getProducts);
router.get('/products/:productId',getProduct);
router.get('/cart',getCart);
router.post('/cart',postCart);
router.post('/cart-delete-item',postCartDeleteProduct);
// router.get('/order',);
// router.get('/checkout',getCheckOut);

export default router;
