import { Request , Response } from 'express';
import otpGenerator from 'otp-generator';
import userModel from '../models/userModel';
import OtpModel from '../models/OTPModel';
import mailSender from '../utils/mailSender';
import {additionalProfile , createUserFunc} from '../utils/authServises'
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_SECRET;


  export const sendOTP = async (req : Request , res : Response) => {
        try{
            // generate otp
            const otp = otpGenerator.generate(6 ,{digits: true , lowerCaseAlphabets:false , upperCaseAlphabets: false , specialChars: false});
            const {email} = req.body;

            // check if user already exist
            const checkUser = await userModel.findOne({email});
            if(checkUser){
                res.status(400).send({
                    success : false,
                    message : "user already exists"
                })
                return;
            }

            // before send new otp delete old opt if exist 
            await OtpModel.deleteMany({ email });

            // save tempory to db
            const otpSave = await OtpModel.create({email , otp});
            console.log(otpSave);

                 // send otp to mail
                  const title = 'Your otp code'
                  const body =  `your one time otp is -> ${otp}`
                  await mailSender({email , title , body});

                 res.status(200).send({
                    success : true,
                    message : "We have send otp to your mail verify now",
                    otp : otpSave.otp
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

   export const signup = async (req : Request , res : Response) => {
        try{

            const {firstName , lastName , password , contact_no ,account_type , email , otp} = req.body;
            console.log(contact_no , typeof(contact_no));

            // input validation by zod pending
            // check user already exist or not
            const checkUser = await userModel.findOne({email});
            if(checkUser){
                res.status(400).send({
                    success : false,
                    message : "user already exists"
                })
                return;
            }

            // verify otp process
            const findOtp = await OtpModel.findOne({email , otp});
            console.log("otp saved in db " , findOtp);
            if(!findOtp){
                res.status(400).send({
                    success : false,
                    message : "Invalid otp"
                })
                return;
            }

            // now auto delete otp after successfully verified
            await OtpModel.deleteOne({ _id: findOtp._id });
            console.log("signup process start");

            // now start signup process...

            // create additional profile
            const additionalProfilePayload = {
                gender: null, dateOfBirth: null , about: null
            }
            const createAdditionalProfile = await additionalProfile(additionalProfilePayload);
            console.log(createAdditionalProfile);

            // now bcrypt password
            const hashPassword = await bcrypt.hash(password , saltRounds);
            console.log(hashPassword);

            const createUserPayload ={
                firstName, lastName , email , contact_no , password : hashPassword , account_type , additional_info : createAdditionalProfile._id
            }
            const createUser = await createUserFunc(createUserPayload);
            console.log(createUser);

                res.status(200).send({
                    success : true,
                    message : "User created successfully"
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
                message : "error comes in signup",
                error : errorMessage
            })
        }
   }

  export const signin = async (req : Request , res : Response) => {
        try{

            const {account_type , email , password} = req.body;

            // validation pending...

            // check email already exists or not
            const checkUser = await userModel.findOne({email});
            if(!checkUser){
                res.status(400).send({
                    success : false,
                    message : "user not found. signup first"
                })
                return;
            }

            // check password is correct or not 
             const checkPassword = await bcrypt.compare(password , checkUser.password);
             if(!checkPassword){
                 res.status(409).send({
                     success : false,
                     message : "password incorrect"
                 })
                 return;
             }

            //  // check for user role
            //  if(checkUser.account_type !== account_type){
            //     res.status(400).send({
            //         success : false,
            //         message : "User role is incorrect"
            //     })
            //     return;
            //  }

            // now create token for user
             const token = secret ? jwt.sign({
               userId : checkUser._id ,
               role : checkUser.account_type
             } , secret, {expiresIn: '3d'}) : null;

            //  console.log(token);

             // now send token to user
            //  if(!token) return;
             res.cookie("token" , token , {  maxAge: 3 * 24 * 60 * 60 * 1000 , httpOnly: true}).status(200).send({
                success : true,
                message : "login successfully",
                token : token,
                user :  checkUser
             })


        }catch(err : unknown){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in signin",
                error : errorMessage
            })
        }
   }

//   export const changePassword = async (req : Request , res : Response) => {
//         try{

//             const {oldPassword , newpassword} = req.body;
        
//             // check old password is correct or not
            

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
