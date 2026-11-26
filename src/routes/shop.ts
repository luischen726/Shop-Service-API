import express from 'express';
import {body, header, param} from 'express-validator'
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
router.get(
    '/products/:productId',
    jwtVerify,
    [
        param("productId")
        .custom((value,{req}) =>{
            if (isNaN( +value)) throw new Error("The productID should be a int ")
            return true  
        })
    ],
    getProduct
);
router.get(
    '/cart',
    jwtVerify, 
    getCart
);
router.post(
    '/cart',
    jwtVerify,
    [
        body("productId", "The ProductID is needed in Integer")
        .isInt()
    ], 
    postCart
);
router.post(
    '/cart-delete-item',
    jwtVerify, 
    [
        body("productId", "The ProductID is needed in Integer")
        .isInt()
    ],
    postCartDeleteProduct
);
// router.get('/order',);
// router.get('/checkout',getCheckOut);

//account
// router.post('/register', postRegister)
// router.post('/login', postLogin)


export default router;
