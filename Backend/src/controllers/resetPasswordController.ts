import { Request , Response } from "express";
import { updateUser } from "../utils/authServises";
import userModel from "../models/userModel";
import crypto from 'crypto'
import mailSender from "../utils/mailSender";
import bcrypt from 'bcrypt';

export const resetPasswordToken = async (req : Request , res : Response) => {
        try{
              const {email} = req.body;
              console.log(email);

              // find user already exists or not
            const checkUser = await userModel.findOne({email});
             if(!checkUser){
                 res.status(400).send({
                     success : false,
                     message : "user not found signup first"
                 })
                 return;
             }

             // create unique token for reset password
             const token = crypto.randomUUID();
             console.log(token);

             // create frontend url for send in mail
             const url = `http://localhost:5173/update-password/${token}`;

             // now save this token in user model with expiry time 
             checkUser.resetPasswordToken = token;
             checkUser.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);
             // now save it
             await checkUser.save();

             // now send url in user's mail
             // mail payload
              const title = 'Reset your password'
              const body =  `Reset yout password through this url -> ${url}`
              const mailPayload = {email , title , body}
              await mailSender(mailPayload);

             // now everything is fine send success response 
             res.status(200).send({
                success : true,
                message : 'We have send reset password url in your mail',
                token : token
             })


        }catch(err){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "error comes in sending reset password link",
                error : errorMessage
            })
        }
   }

export const resetPasswordVerification = async (req : Request , res : Response) => {
        try{
              const {password , token} = req.body;

               // find user already exists or not
            const checkUser = await userModel.findOne({resetPasswordToken : token});
            console.log(checkUser);

             // now verify user token
             if(!checkUser){
                res.status(400).send({
                    success : false,
                    message : "Invalid Token for Reset Password"
                })
                return;
             }

             // now check token expiry
             const checkExpiry = checkUser.resetPasswordExpires;
             if (!checkExpiry || checkExpiry < new Date()) {
                res.status(400).send({
                  success: false,
                  message: "Token expired. Please request a new one."
                });
                return;
             }


             // if user is verified now update user reset password and expiry 
              checkUser.resetPasswordToken = null;
              checkUser.resetPasswordExpires = null;

              // password bcrypt
              const hashPassword = await bcrypt.hash(password ,10);
              checkUser.password = hashPassword;
              await checkUser.save();


              res.status(200).send({
                success : true,
                message : 'Password update successfully'
             })


        }catch(err){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "error comes in send otp",
                error : errorMessage
            })
        }
   }
