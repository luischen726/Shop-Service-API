import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";
import {Model} from "sequelize/types"
import Product from '../models/product'
import Cart from '../models/cart'
import User ,{UserInstance}from '../models/user'

import bcrypt from "bcryptjs"

export function postRegister(req: Request, res:Response, next:NextFunction){
    const registerInfo :{
        email: string,
        // name: string,
        password: string
    }= req.body

    if (!registerInfo?.email) return res.json("email is required")
    // if (!registerInfo?.name) return res.json("name is required")
    if (!registerInfo?.password) return res.json("password is required")
    

    
    User.findOne({where:{email:registerInfo.email}})
    .then(findResult => {

        if (findResult === null ) return bcrypt.hash(registerInfo.password,12)    
        .then(hPassword =>{
            return User.create({
                // name:registerInfo.name, 
                email:registerInfo.email,
                // account: "luis726",
                password: hPassword
            });
        })
        .then((user: UserInstance)  => {
            if (user === null) return res.json("Something wrong with create user")
            res.json("Register is succeeded ")
        })
        .catch(err =>  console.log(err))

        res.json("the User is exist")
        
        
    })

    .catch(err => console.log(err))
};
export function postLogin(req: Request, res:Response, next:NextFunction){
    const loginInfo = req.body;
    if (!loginInfo?.password || !loginInfo?.email ) return res.json(`information is insufficient`)

    User.findOne({where:{email: loginInfo.email}})
    .then((user) =>{
        if (user === null) return res.json(`There is no user email is ${loginInfo.email}, Please register`)

        return bcrypt.compare(loginInfo.password, user.password)
        .then(doMatch =>{
            if (!doMatch) return res.json("the password is incorrect")
            const token = jwt.sign(
                {userId:user.id}, 
                `${process.env.MYSQL_PASSWORD}`,
                {expiresIn: "1h" }
            )
            
            res.json({token})
            })
        .catch(err =>{
            res.json("something wrong with compare password")
        })

        

        
    })
    .catch(err => res.json("Something wrong with User model"))
};