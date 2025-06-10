import { Request , Response } from "express";
import { updateUser } from "../utils/authServises";
import userModel from "../models/userModel";
import crypto from 'crypto'
import mailSender from "../utils/mailSender";


// export const resetPassword = async (req : Request , res : Response) => {
//         try{

//             const {email , newPassword , otp} = req.body;

//             // find user already exists or not
//             const checkUser = await userModel.findOne({email});
//              if(!checkUser){
//                  res.status(400).send({
//                      success : false,
//                      message : "user not found"
//                  })
//                  return;
//              }

//             // now first verify user
//             const verifyUser = await OtpModel.findOne({email , otp});
//             if(!verifyUser){
//                 res.status(400).send({
//                     success : false,
//                     message : "Invalid otp"
//                 })
//                 return;
//             }

//             // if user is verified then update user in db 
//             const updateUserPassword = await updateUser(newPassword , email);
//             console.log(updateUserPassword);



//         }catch(err){
//             let errorMessage;
//             if(err instanceof Error){
//                 errorMessage = err.message
//             } else if(typeof(err) === 'string'){
//                 errorMessage = err
//             }
//             res.status(500).send({
//                 success : false,
//                 message : "error comes in send otp",
//                 error : errorMessage
//             })
//         }
//    }

export const resetPasswordToken = async (req : Request , res : Response) => {
        try{
              const {email} = req.body;

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
             const url = `http://localhost:3000/update-password/${token}`;

             // now save this token in user model with expiry time 
             checkUser.resetPasswordToken = token;
             checkUser.resetPasswordExpires = new Date(Date.now() + 5 * 60);
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
                message : "error comes in send otp",
                error : errorMessage
            })
        }
   }

export const resetPasswordVerification = async (req : Request , res : Response) => {
        try{
              const {email , password , token} = req.body;

               // find user already exists or not
            const checkUser = await userModel.findOne({email});
             if(!checkUser){
                 res.status(400).send({
                     success : false,
                     message : "user not found signup first"
                 })
                 return;
             }

             // now verify user token
             const getToken = checkUser.resetPasswordToken
             if(getToken !== token){
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
              // we should becrypt password before saving it
              checkUser.password = password;
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
 