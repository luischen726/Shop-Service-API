import Product from "../models/product";


export function getAddProduct (req: any, res:any, next:any){
    res.json()
    
}


export function postAddProduct (req: any, res:any, next:any){
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