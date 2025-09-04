import { Request , Response } from "express";
import mongoose from "mongoose";
const secret = process.env.TOKEN_SECRET;
import jwt , {JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
        user : JwtPayload;
}

export const userAuth = (req : Request , res : Response , next : Function) => {
        try{

            const userReq = req as AuthenticatedRequest;
            const {token} = req.headers;
            console.log("Inside user auth -> " , token , typeof(token))

            if(!token || typeof token!== "string"){
                res.status(400).send({
                    success : false,
                    message : "Token Required"
                })
                return;
            }

            // now verify token
            const verifyToken =  jwt.verify(token , secret!) as JwtPayload
            // console.log(verifyToken , "Inside auth -> verifyToken");

            if(!verifyToken){
            res.status(403).send({
                success : false,
                message: "Token invalid"
            })
            return;
            }

            userReq.user = verifyToken;

            next();

        }catch(err : unknown){
            let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in user auth",
                error : errorMessage
            })
        }
   }

   export const isStudent = (req : Request , res : Response , next : Function) => {
    try{
        const userReq = req as AuthenticatedRequest;
        if(userReq.user.role !== "Student") {
             res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
            return;
        }
        next();
    }
    catch(err) {
        let errorMessage;
         if(err instanceof Error){
             errorMessage = err.message
         } else if(typeof(err) === 'string'){
             errorMessage = err
         }
         res.status(500).send({
             success : false,
             message : "Something wrong in isStudent auth",
             error : errorMessage
         })
    }
}

  export const isInstructor = (req : Request , res : Response , next : Function) => {
    try{
        const userReq = req as AuthenticatedRequest;
        // console.log(userReq.user);
        // console.log(userReq.user.accountType , typeof(userReq.user.accountType));
        if(userReq.user.role !== "Instructor") {
             res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only',
            });
            return;
        }
        next();
    }
    catch(err) {
        let errorMessage;
         if(err instanceof Error){
             errorMessage = err.message
         } else if(typeof(err) === 'string'){
             errorMessage = err
         }
         res.status(500).send({
             success : false,
             message : "Something wrong in isInstructor auth",
             error : errorMessage
         })
    }
}

export const isAdmin = (req : Request , res : Response , next : Function) => {
    try{    
           const userReq = req as AuthenticatedRequest;
           if(userReq.user.role !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(err) {
       let errorMessage;
         if(err instanceof Error){
             errorMessage = err.message
         } else if(typeof(err) === 'string'){
             errorMessage = err
         }
         res.status(500).send({
             success : false,
             message : "Something wrong in isAdmin auth",
             error : errorMessage
         })
    }
   }