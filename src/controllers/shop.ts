
import Product from '../models/product'
import Cart from '../models/cart'

export function getProducts (req: any, res:any, next:any){

    Product.fetchAll( (data: object[]) =>{
        res.status(200).json(data)
    })
    
    
} 

export function getProduct(req: any, res:any, next:any){
    const id = req.params.productId
    Product.fetchOne(id, (d: {} | undefined) =>{
        if (!d) return res.status(404).json("No data found")
        res.status(200).json(JSON.stringify(d))
    })
}


export function getCart (req: any, res:any, next:any){
    res.status(200).json("")

}
export function addProductToCart (req: any, res:any, next:any){
    const id = req.body.id;
    Product.fetchOne(id, (d: {price:number} | undefined) =>{
        if (!d) return res.status(404).json("No Product found")
        Cart.addProduct(id, d.price)
        res.status(200).json("Success!")
    })
}

export function getCheckOut (req: any, res:any, next:any) {
    res.status(200).json("")

} 