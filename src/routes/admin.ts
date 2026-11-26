import express from 'express';
import { body, param} from 'express-validator'

const router = express.Router();

import {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
} from '../controllers/admin'
import {jwtVerify} from '../middlewares/jwt-verify'


// // /admin/add-product => GET
// router.get('/add-product', getAddProduct)

// /admin/products => GET
router.get('/products', jwtVerify, getAddProduct)

// /admin/add-product => POST
router.post(
    '/add-product', 
    jwtVerify,
    [
        body("title", "Please provide title in string and length is between 5 to 30 character")
        .isString()
        .isLength({min:5, max: 30})
        .trim(),
        body("price", "Please provide the price for the product in number")
        .isNumeric(),
        body("imageURL", "Please provide legit URL")
        .isURL()
        .trim(),
        body("description", "Please provide description between 5 to 100")
        .isString()
        .isLength({min:5, max:100})
        .trim()

    ],   
    postAddProduct
)

router.get(
    '/edit-product/:id', 
    jwtVerify, 
    [
        param("id","Please provide product id in numeric")
        .custom((value,{req}) =>{
            if (isNaN( +value)) throw new Error("The productID should be a int ")
            return true  
        }),
    ],
    getEditProduct
);
//curl -X POST localhost:3000/admin/edit-product -H "Content-Type: application/json" -d '{"productId":1,"title":"new Book", "description": "dfasdfad", "price":100,"imageURL":"dfmasdfa"}'
router.post(
    '/edit-product',
    jwtVerify,
    [
        body('productId',"Please provide product id in numeric")
        .isNumeric(),
        body("title", "Please provide title in string and length is between 5 to 30 character")
        .isString()
        .isLength({min:5, max: 30})
        .trim(),
        body("price", "Please provide the price for the product in number")
        .isNumeric(),
        body("imageURL", "Please provide legit URL")
        .isURL()
        .trim(),
        body("description", "Please provide description between 5 to 100")
        .isString()
        .isLength({min:5, max:100})
        .trim()
    ],   
    postEditProduct
)
router.post(
    '/delete-product',
    jwtVerify, 
    [
        body('productId')
        .isNumeric(),
    ],
    postDeleteProduct 
)

export default router;