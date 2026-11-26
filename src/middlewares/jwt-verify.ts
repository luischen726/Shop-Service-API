
import express, { 
    NextFunction,
    Request,
    Response,
    
} from 'express';
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator"


import User, {UserInstance} from "../models/user";
import Cart from '../models/cart';

export function jwtVerify (req:Request, res: Response, next:NextFunction) {
    const error = validationResult(req)

    if (!error.isEmpty()){
        console.log(error.array())
        return res.status(422).json(error.array()[0].msg)
    }
    const token = req.get("Authorization")?.split(" ")[1];
    if (!token) return res.json("Please login before anything")
    
    let decode:any = null;

    try{
        decode = jwt.verify(token,`${process.env.MYSQL_PASSWORD}`);
    }catch(error){
        console.log("(((((")
        console.error(error)
        console.log(")))))")
        return res.json("token is invalid")
    }
    console.log(req.headers)
    User.findByPk(decode.userId)
    .then((u: UserInstance |null) => {
        if (u === null) throw new Error("can not find user");
        req.user = u;
        return Cart.findByPk(decode.userId)
        
    })
    .then(cart =>{
        if (!cart) return req.user.createCart()
        return cart
    })
    .then(cart =>{
        next();
    })
    .catch(err => res.json(`Authorization matches no user`));
}