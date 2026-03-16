import {Request, Response, NextFunction} from 'express'
import Product from "../models/product";


export function getAddProduct (req: Request, res:Response, next:NextFunction){
    Product.fetchAll((currentData: object[]) =>{
        if (currentData) return res.status(200).json(currentData)
        res.status(200).json([])
    })
    
    
}


export function postAddProduct (req: Request, res:Response, next:NextFunction){
    const newProduct = new Product(
        req.body.title? req.body.title: "",
        req.body.imagURL? req.body.imagURL: "",
        req.body.description? req.body.description : "",
        req.body.price? req.body.price : 0
    );
    newProduct.save((err: null | Error) =>{
        if (!err){
            Product.fetchAll( (data: object[]) =>{
                res.status(200).json(data)
            });
        } else {
            res.status(400).json("Add product fail!")
        }
    });

} 