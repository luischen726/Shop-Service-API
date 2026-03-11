
import Product from '../models/product'


export function getProducts (req: any, res:any, next:any){

    Product.fetchAll( (data: object[]) =>{
        res.status(200).json(data)
    })
    
    
} 

export function getProduct(req: any, res:any, next:any){}


export function getCart (req: any, res:any, next:any){
    res.status(200).json("")

}

export function getCheckOut (req: any, res:any, next:any) {
    res.status(200).json("")

} 