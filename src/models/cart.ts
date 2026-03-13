import fs from 'node:fs'
import rootDir from '../util/path';
import path from 'path';

const storePath = path.join(rootDir, 'carts.json') 

type productType = {
    id: number,
    qty:number
}
type cartType = {products: productType[], totalPrice :number}

export default class Cart{
    static addProduct(id:number, price: number){
        fs.readFile(storePath, 'utf-8',(err, fileContent) =>{
            let cart:cartType = {
                products:[],
                totalPrice: 0 
            } 
            if (!err && typeof fileContent === 'string') {
                cart = JSON.parse(fileContent);
            }

            const findTheProductInCartIndex: number = cart.products.findIndex(i => i.id ===id) 
            let temp:productType ;
            if (findTheProductInCartIndex >= 0 && cart.products[findTheProductInCartIndex]){
                temp =  {...cart.products[findTheProductInCartIndex]};
                temp.qty = temp.qty + 1; 
                cart.products[findTheProductInCartIndex] = temp

            } else {
                temp = {
                    id: id,
                    qty: 1
                }
                cart.products.push(temp)
            }

            cart.totalPrice = cart.totalPrice + price

            fs.writeFile(storePath, JSON.stringify(cart), (e)=>{
                if (e) console.log(e)
            })

        })

    }
}