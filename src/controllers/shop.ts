
import {Request, Response, NextFunction} from 'express'
import {Model} from "sequelize/types"
import Product from '../models/product'
import Cart from '../models/cart'


export function getIndex (req: Request, res:Response, next:NextFunction){
    req.user.createProduct
    Product.findAll()
    .then(products =>{
        res.status(202).json(products)
    })
    .catch(err => console.log(err) )
}

export function getProducts (req: Request, res:Response, next:NextFunction){

    Product.findAll()
    .then(products =>{
        res.status(202).json(products)
    })
    .catch(err => console.log(err) )
    
    
} 

export function getProduct(req: Request, res:Response, next:NextFunction){
    const id = req.params.productId
    if (typeof id === "string") {

        Product.findOne({where:{id: +id}})
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err => console.log(err))

    }


}


export function getCart (req: Request, res:Response, next:NextFunction){
    req.user.getCart()
    .then((cart: any) =>{
        return cart.getProducts()
    })
    .then((products: any[]) =>{
        res.status(200).json(products)
    })
    .catch((err: any) => console.log(err));

}

//curl -X POST localhost:3000/cart -H "Content-Type: application/json" -d '{"productId":1 }'
export function postCart (req: Request, res:Response, next:NextFunction){
    const productId = req.body.productId
    let fetchedCart: { addProduct: (o:any, options:object) => any };
    let newQuantity = 1;
    req.user.getCart()
    .then((cart: any) =>{
        fetchedCart = cart;
        return cart.getProducts({where: {id:productId}})
    })
    .then((products: any[]) =>{
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity +1;
        }

        return Product.findByPk(productId)

    })
    .then((product:any) =>{
        return fetchedCart.addProduct(product, {through:{quantity:newQuantity}})

            
    })
    .then((result:any) =>{
        res.status(200).json(result)
    })
    .catch((err: any) => console.log(err))
}

//curl -X POST localhost:3000/cart-delete-item -H "Content-Type: application/json" -d '{"productId":2 }'
export function postCartDeleteProduct (req: Request, res:Response, next:NextFunction) {
    const productId = req.body.productId;
    req.user.getCart()
    .then((cart:any) =>{
        return cart.getProducts({where:{id:productId}})
    })
    .then((products:any[]) =>{
        const targetProduct = products[0]
        return targetProduct.cartItem.destroy();
    })
    .then((result:any) =>{
        res.status(200).json(result)
    })
    .catch((err:any)=> console.log(err))
}

// export function getCheckOut (req: Request, res:Response, next:NextFunction) {
//     res.status(200).json("")

// } 