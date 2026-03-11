import express from 'express';

const router = express.Router();

import {getAddProduct,postAddProduct} from '../controllers/admin'


// router.get('/add-product', (req,res,next) =>{
//     res.send(`<html><form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add project</button></form></html>`)
    
// })

// /admin/add-product => GET
router.get('/add-product', getAddProduct)

router.get('/products', getAddProduct)

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

export default router;