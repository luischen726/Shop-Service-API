import express from 'express';
import {query, check, body, param} from 'express-validator'

import User from '../models/user';

const router = express.Router();

import {
    postRegister,
    postLogin,
    postResetRequest,
    postResetPassword
} from '../controllers/auth'

//account
router.post(
    '/register', 
    [
        check('email', "Please enter valid email address")
        .isEmail()
        .custom((value, {req}) =>{
            return User.findOne({where:{email: value}})
            .then((user) =>{
                if (user !== null) return Promise.reject(`The email: ${value} is already exist!`);
                return true;
            })

        })
        .normalizeEmail(), 
        body("password", "Please use numbers and characters only and length should be longer than 4.")
        .isLength({min:4})
        .isAlphanumeric()
        .trim(),
        body("confirmPassword")
        .custom((value,{req}) =>{
            if (value !== req.body.password) throw new Error("Password and confirmPassword should match!");
            return true;
        })
        .trim()

    ],
    postRegister
)
router.post(
    '/login', 
    [
        check('email', "Please enter valid email address")
        .isEmail()
        .normalizeEmail(), 
        body("password", "Please use numbers and characters only and length should be longer than 4.")
        .isLength({min:4})
        .isAlphanumeric()
        .trim(),
    ],
    postLogin
)
router.post(
    '/resetRequest',
    [
        check('email', "Please enter valid email address")
        .isEmail()
        .normalizeEmail(), 
    ], 
    postResetRequest
)
router.post(
    '/resetPassword/:resetToken', 
    [
        param("resetToken", "The rest token is invalid")
        .isHash('sha256'),
        body("newPassWord", "Please use numbers and characters only and length should be longer than 4.")
        .isLength({min:4})
        .isAlphanumeric()
        .trim(),
        body("confirmPassword")
        .custom((value,{req}) =>{
            if (value !== req.body.newPassWord) throw new Error("newPassWord and confirmPassword should match!");
            return true;
        })
        .trim()
    ],
    postResetPassword
)

export default router;