import {Request, Response, NextFunction} from 'express'
import Product from "../models/product";
import { Model } from 'sequelize';


export async function getAddProduct (req: Request, res:Response, next:NextFunction){
    // Product.fetchAll((currentData: object[]) =>{
    //     if (currentData) return res.status(200).json(currentData)
    //     res.status(200).json([])
    // })

    // Product.findAll()
    try{
        console.log(await req.user.countProducts())
        const products =  await req.user.getProducts();
        res.status(200).json(products)
    } catch (err: any){
        console.log(err)
    } 

}



//curl -X POST localhost:3000/admin/add-product -H "Content-Type: application/json" -d '{"title":"new item", "price":1, "imageURL":"fakeURL","description":"fake description" }'
export function postAddProduct (req: Request, res:Response, next:NextFunction){

    // Product.create({
    //     title:  req.body.title? req.body.title: "",
    //     price: req.body.price? req.body.price : 0,
    //     imageURL: req.body.imageURL? req.body.imageURL: "",
    //     description: req.body.description? req.body.description : "",
    //     UserId: req.user.id
    // })
    req.user.createProduct({
        title:  req.body.title? req.body.title: "",
        price: req.body.price? req.body.price : 0,
        imageURL: req.body.imageURL? req.body.imageURL: "",
        description: req.body.description? req.body.description : "",
    })
    .then((result:any) => {
        res.status(200).json("success")
    })
    .catch((err:any) => console.log(err))

} 

export function getEditProduct(req: Request, res:Response, next:NextFunction){
    const id = +req.params.id;
    const queryTitle = req.query?.title
    if (typeof id !== 'number' ) return res.status(400).json("fail to find product")
    req.user.getProducts({where:{id}})
    .then((products: any[]) =>{
        const product = products[0]
        res.status(200).json(product)
    })
    .catch((err:any) => console.log(err))
}

export function postEditProduct(req: Request, res:Response, next:NextFunction){
    const productId: number  = req.body.productId;
    const title = req.body.title
    const imageURL = req.body.imagURL
    const description = req.body.description
    const price = req.body.price

    Product.update({
        title,imageURL,description,price
    }, {where:{id: productId}})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err => console.log(err));
}

export function postDeleteProduct(req: Request, res:Response, next:NextFunction){
    const productId: number  = req.body.productId;

    Product.destroy({where:{id:productId}})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err => console.log(err));
}