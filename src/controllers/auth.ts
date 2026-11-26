import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";
import {validationResult} from 'express-validator'
import {Model, where} from "sequelize/types"
import Product from '../models/product'
import Cart from '../models/cart'
import User ,{UserInstance}from '../models/user'
import nodemailer  from "nodemailer"
import crypto from "crypto"
import {Op} from "sequelize"


const transporter = nodemailer.createTransport({
    host:"smtp.resend.com",
    port:465,
    secure:true,
    auth:{
        user:"resend",
        pass: process.env.EMAIL_PROVIDER_API,
    }
})

import bcrypt from "bcryptjs"

export function postRegister(req: Request, res:Response, next:NextFunction){
    const registerInfo :{
        email: string,
        // name: string,
        password: string
    }= req.body
    const error = validationResult(req);
    if (!error.isEmpty())return res
    .status(422)
    .json(error.array()[0].msg); 

    

    bcrypt.hash(registerInfo.password,12)    
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
        transporter.sendMail({
            from:"onboarding@resend.dev",
            to: registerInfo.email,
            subject:"Sign up succeed!!",
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>Welcome!</title>
                </head>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                    <h1 style="color: #333333;">Welcome! 🎉</h1>
                    <p>Thank you for signing up!</p>
                    <p>We're excited to have you join us.</p>
                    <p>Your account has been successfully created. You can now log in and start exploring our services.</p>
                    <hr style="border: none; border-top: 1px solid #eeeeee;">
                    <p style="font-size: 12px; color: #888888;">
                    This is an automated email. Please do not reply.
                    </p>
                </div>
                </body>
            </html>
            `
        })
        res.json("Register is succeeded ")
    })
    .catch(err => console.log(err))
};
export function postLogin(req: Request, res:Response, next:NextFunction){
    const loginInfo = req.body;

    const error = validationResult(req);
    if (!error.isEmpty())return res
    .status(422)
    .json(error.array()[0].msg); 

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

export function postResetRequest(req: Request, res:Response, next:NextFunction){
    const resetInfo = req.body;
    
    const error = validationResult(req);
    if (!error.isEmpty())return res
    .status(422)
    .json(error.array()[0].msg); 
    
    crypto.randomBytes(32, (err, buffer)=>{
        if (err){
            console.error(err);
            return res.json("something wrong with crypto")
        }

        const token = buffer.toString('hex')
        const hashToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

        User.findOne({where:{email:resetInfo.email }})
        .then((user: UserInstance |null) =>{
            if (user === null) {
                res.json(`Email: ${resetInfo.email} is not register.`);
                return 
            }
            if (user.resetToken !== null){
                res.status(404).json("reset email is send")
                return
            }
            
            const resetUrl = `http://${process.env.SERVER_DOMAIN}/resetPassWord/${token}`
            transporter.sendMail({
                from:"onboarding@resend.dev",
                to: user.email,
                subject:"Reset Your Password",
                html: `
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset your password.</p>
                    <p>Click the link below to create a new password:</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>This link expires in 15 minutes.</p>
                    <p>If you didn't request this, you can ignore this email.</p>
                `
            })

            return User.update({
                resetToken:hashToken,
                resetTimeOut:Date.now() + (15 * 60000)
            },{where:{id:user.id}})
        })
        .then(updateResult =>{
            if (!updateResult) {
                res.status(404).json("update restToken fail")
                return;
            }

            res.status(200).json("rest email send!")

            
        })
        .catch(error =>{console.error(err)})
    });

}

export function postResetPassword(req: Request, res:Response, next:NextFunction){
    let resetToken = req.params.resetToken;
    const newPassword = req.body.newPassWord;
    
    const error = validationResult(req);
    if (!error.isEmpty())return res
    .status(422)
    .json(error.array()[0].msg); 

    // if (!newPassword){
    //     res.status(404).json(`newPassword: ${newPassword} is invalid`)
    //     return;
    // }
    
    if (!resetToken || typeof resetToken !== "string") {
        res.status(404).json("The reset token is invalid!!")
        return;
    }
    const submitToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    let foundUser:UserInstance | null = null
    User.findOne({where:{resetToken:submitToken,resetTimeOut:{[Op.gt]:Date.now()}}})
    .then(user =>{
        if (user === null) {
            res.status(404).json("Token is invalid")
            return;
        }
        foundUser = user;
        return bcrypt.hash(newPassword,12)   
    })
    .then(hashPassword =>{
        if (foundUser === null){
            res.status(404).json("There is no user found!!")
            return;
        }

        return User.update({
            resetToken:null,
            password:hashPassword
        },{where:{id:foundUser.id}})

    })
    .then(updateResult =>{
        if (foundUser === null){
            res.status(404).json("There is no user found!!")
            return;
        }

        if (!updateResult){
            res.status(404).json("Update password fail")
            return;
        }

        return  transporter.sendMail({
            from:"onboarding@resend.dev",
            to: foundUser.email,
            subject:"Reset Your Password",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset Successful</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif;">

                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">

                    <!-- Header -->
                    <div style="background-color: #2563eb; padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 26px;">
                            Password Reset Successful
                        </h1>
                    </div>

                    <!-- Content -->
                    <div style="padding: 35px; color: #333333; line-height: 1.6;">

                        <h2 style="color: #16a34a; margin-top: 0;">
                            ✓ Password Updated
                        </h2>

                        <p>Hello,</p>

                        <p>
                            Your account password has been successfully changed.
                        </p>

                        <p>
                            You can now sign in to your account using your new password.
                        </p>

                        <p style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; border-radius: 4px;">
                            <strong>Security Notice:</strong><br>
                            If you did not make this change, please contact our support team immediately.
                        </p>

                        <p>
                            For your security, we recommend keeping your password private
                            and avoiding using the same password across multiple websites.
                        </p>

                        <p>
                            Thank you for using our service!
                        </p>

                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="font-size: 12px; color: #6b7280; margin: 0;">
                            This is an automated security notification. Please do not reply.
                        </p>
                    </div>

                </div>

            </body>
            </html>
            `
        })

    })
    .then(emailResult =>{
        if (!emailResult) {
            res.status(404).json("confirm email is fail");
            return;
        };
        res.status(200).json("Reset password succeed!!")

    })
    .catch(error => console.log(error));
}