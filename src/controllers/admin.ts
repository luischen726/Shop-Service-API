import {Request, Response, NextFunction} from 'express'
import Product from "../models/product";


export function getAddProduct (req: Request, res:Response, next:NextFunction){
    res.json()
    
}


export function postAddProduct (req: Request, res:Response, next:NextFunction){
    const newProduct = new Product(
        req.body.title? req.body.title: "",
        req.body.imagURL? req.body.imagURL: "",
        req.body.description? req.body.description : "",
        req.body.price? req.body.price : 0
    );
    newProduct.save();
    Product.fetchAll( (data: object[]) =>{
        res.status(200).json(data)
    });
} 