import express from 'express';

const router = express.Router();

import {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
} from '../controllers/admin'


// // /admin/add-product => GET
// router.get('/add-product', getAddProduct)

// /admin/products => GET
router.get('/products', getAddProduct)

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

router.get('/edit-product/:id',getEditProduct)
//curl -X POST localhost:3000/admin/edit-product -H "Content-Type: application/json" -d '{"productId":1,"title":"new Book", "description": "dfasdfad", "price":100,"imageURL":"dfmasdfa"}'
router.post('/edit-product',postEditProduct)
router.post('/delete-product',postDeleteProduct )

export default router;