import express from 'express';

const router = express.Router();

import {getAddProduct,postAddProduct,getEditProduct} from '../controllers/admin'


// router.get('/add-product', (req,res,next) =>{
//     res.send(`<html><form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add project</button></form></html>`)
    
// })

router.get('/products', getAddProduct)

// /admin/add-product => GET
router.get('/add-product', getAddProduct)

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

router.get('/edit-product/:index',getEditProduct)

export default router;