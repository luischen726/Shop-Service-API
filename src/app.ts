
import express, { 
    NextFunction,
    Request,
    Response,
    
} from 'express';
import bodyParser from 'body-parser';
import sequelize from './util/database';
import Product from "./models/product";
import User from "./models/user";
import Cart from './models/cart';
import CartItem from './models/cart-item';



const app = express();

import adminRouter from  './routes/admin';
import shopRouter from './routes/shop';

import {page404} from './controllers/pageNotFound'

// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use((req:Request, res: Response, next:NextFunction) =>{
    if (req.user) return next()
        
    User.findByPk(1)
    .then(u => {
        if (u === null) throw new Error("can not find user");
        req.user= u;
        return Cart.findByPk(1)
        
    })
    .then(cart =>{
        if (!cart) return req.user.createCart()
        return cart
    })
    .then(cart =>{
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRouter);
app.use(shopRouter);

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
    return User.findByPk(1);
})
.then((u: any ) =>{
    if (!u) return User.create({name:"luis", email:"test@test.com"})
    return u
})
.catch(err => console.log(err))

export default app


// app.listen(3000);

