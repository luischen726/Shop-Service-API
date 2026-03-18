
// import {Request, Response, NextFunction} from 'express'
// import Product from '../models/product'
// import Cart from '../models/cart'

// export function getProducts (req: Request, res:Response, next:NextFunction){

//     Product.fetchAll( (data: object[]) =>{
//         res.status(200).json(data)
//     })
    
    
// } 

// export function getProduct(req: Request, res:Response, next:NextFunction){
//     const id = req.params.productId
//     if (typeof id === "string") {
//         Product.fetchOne(+id, (d: {} | undefined) =>{
//             if (!d) return res.status(404).json("No data found")
//             res.status(200).json(JSON.stringify(d))
//         })
//     }


// }


// export function getCart (req: Request, res:Response, next:NextFunction){
//     res.status(200).json("")

// }
// export function addProductToCart (req: Request, res:Response, next:NextFunction){
//     const id = req.body.id;
//     Product.fetchOne(id, (d: {price:number} | undefined) =>{
//         if (!d) return res.status(404).json("No Product found")
//         Cart.addProduct(id, d.price)
//         res.status(200).json("Success!")
//     })
// }

// export function getCheckOut (req: Request, res:Response, next:NextFunction) {
//     res.status(200).json("")

// } 