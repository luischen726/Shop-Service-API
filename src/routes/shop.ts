import express from 'express';

const router = express.Router();

import {jwtVerify} from '../middlewares/jwt-verify'

import {
    getIndex,
    getProducts,
    getProduct,
    getCart,
    // getCheckOut,
    postCart,
    postCartDeleteProduct,
    // postRegister,
    // postLogin
} from '../controllers/shop'

router.get('/',getIndex);
router.get('/products',getProducts);
router.get('/products/:productId',jwtVerify,getProduct);
router.get('/cart',jwtVerify, getCart);
router.post('/cart',jwtVerify, postCart);
router.post('/cart-delete-item',jwtVerify, postCartDeleteProduct);
// router.get('/order',);
// router.get('/checkout',getCheckOut);

//account
// router.post('/register', postRegister)
// router.post('/login', postLogin)


export default router;
