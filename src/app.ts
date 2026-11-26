
import express, { 
    NextFunction,
    Request,
    Response,
    
} from 'express';
import jwt from "jsonwebtoken";

import bodyParser from 'body-parser';
import sequelize from './util/database';
import Product from "./models/product";
import User from "./models/user";
import Cart from './models/cart';
import CartItem from './models/cart-item';



const app = express();

import adminRouter from  './routes/admin';
import shopRouter from './routes/shop';
import authRouter from './routes/auth'

import {page404} from './controllers/pageNotFound'

// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// app.use((req:Request, res: Response, next:NextFunction) =>{
//     if (req.user) return next()
        
//     User.findByPk(1)
//     .then(u => {
//         if (u === null) throw new Error("can not find user");
//         req.user= u;
//         return Cart.findByPk(1)
        
//     })
//     .then(cart =>{
//         if (!cart) return req.user.createCart()
//         return cart
//     })
//     .then(cart =>{
//         next();
//     })
//     .catch(err => console.log(err));
// })

// app.use((req:Request, res: Response, next:NextFunction) =>{
//     const token = req.get("Authorization")?.split(" ")[1];
//     if (!token) return res.json("Please login before anything")
    
//     let decode = null;

//     try{
//         decode = jwt.verify(token,"secret string");
//     }catch(error){
//         console.log("(((((")
//         console.error(error)
//         console.log(")))))")
//         return res.json("token is invalid")
//     }

//     User.findByPk(token)
//     .then(u => {
//         if (u === null) throw new Error("can not find user");
//         req.user= u;
//         return Cart.findByPk(1)
        
//     })
//     .then(cart =>{
//         if (!cart) return req.user.createCart()
//         return cart
//     })
//     .then(cart =>{
//         next();
//     })
//     .catch(err => res.json(`Authorization matches no user`));
// })

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter)
app.use(page404)


Product.belongsTo(User, {constraints:true, onDelete: "CASCADE"})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Product.belongsToMany(Cart,{through: CartItem})
Cart.belongsToMany(Product,{through: CartItem})

// sequelize.sync({force:true})
sequelize.sync()
.then(result =>{
    // return User.findByPk(1);
})
// .then((u: any ) =>{
//     if (!u) return User.create({
//         // name:"luis", 
//         email:"test@test.com",
//         // account: "luis726",
//         password: "1234"
//     })
//     return u
// })
.catch(err => console.log(err))

export default app


// app.listen(3000);

