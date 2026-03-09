import express from 'express';

const router = express.Router();

router.use('/add-product', (req,res,next) =>{
    res.send(`<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add project</button></form></html>`)
    
})

router.use('/product', (req, res, next) =>{
    res.redirect('/')
})

export default router;