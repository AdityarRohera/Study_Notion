import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
// import mongoose from "mongoose";
import purchaseModel from "../models/purchaseModel";

export const getEnrolledCourses = async(req : Request , res : Response) => {
    try{     
        console.log("Inside get all purchase courses route")
             const userReq = req as AuthenticatedRequest;
             const {userId} = userReq.user;
             

            const enrolledCourses = await purchaseModel
                                          .find({ userId, status: "Paid" })
                                          .populate({path : 'courseId'})
                                          .exec();
            
            // console.log(enrolledCourses)
             
            if (!enrolledCourses || enrolledCourses.length === 0) {
                res.status(404).send({
                success: false,
                message: "No enrolled courses found",
                enrolledCourses: []
              });
              return;
            }
             
             res.status(200).send({
                success: true,
                message: "Enrolled courses fetched successfully",
                enrolledCourses
             });        
        
    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in get user enrolled courses",
                error : errorMessage
            })
    }
}