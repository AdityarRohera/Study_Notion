import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { findUserById } from "../utils/authServises";
import { findCourseByID } from "../utils/courseServises";
import ratingAndReviewModel from "../models/RatingAndReviewModel";
import { checkPurchasedCourse } from "../utils/purchaseServices";
import {createRatingAndReview , checkCourseReviewed , getAllRatingOFCourse } from "../utils/ratingAndReviewServices";

// now create handler
export const createRatingHandler = async(req : Request , res : Response) => {
    try{

        const userReq = req as AuthenticatedRequest
        const {userId} = userReq.user;
        const {courseId , rating ,review} = req.body;

        // validation of body getting pending...

          // validate userId and courseId
        const findUser = await findUserById(userId);
        if(!findUser){
            res.status(400).send({
                success : false,
                message : "User not found for this user ID"
            })
            return;
        }

        const findCourse = await findCourseByID(courseId);
        if(!findCourse){
            res.status(400).send({
                success : false,
                message : "Course not found for this course ID"
            })
            return;
        }

        // check if user already enrolled in course or not 
        const checkUserEnrolled = await checkPurchasedCourse(userId , courseId);
        if(!checkUserEnrolled){
            res.status(400).send({
                success : false,
                message : "course not purchased"
            })
            return;
        }

        // check if user already reviewed the course of not
        const checkAlreadyReviewed = await checkCourseReviewed(userId , courseId);
         if(checkAlreadyReviewed){
            res.status(400).send({
                success : false,
                message : "You Have already reviewed this course"
            })
            return;
        }

        // create rating for the course
        const ratingAndReviewPayload = {userId , courseId , rating , review};
        await createRatingAndReview(ratingAndReviewPayload);

        // now update course model
         findCourse.TotalNumberRated += 1;
         findCourse.totalSum += rating;
         findCourse.save();

         res.status(200).send({
            success : true,
            message : "Rating updated successfully"
         })
        
            
    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in rating and review",
                error : errorMessage
            })
    }
}

export const getAllRatingHandler = async(req : Request , res : Response) => {
    try{

        const {courseId} = req.body;

        // validation of body getting pending...

        // validate courseId
        const findCourse = await findCourseByID(courseId);
        if(!findCourse){
            res.status(400).send({
                success : false,
                message : "Course not found for this course ID"
            })
            return;
        }

        const getAllRating = await getAllRatingOFCourse(courseId);
        res.status(200).send({
            success: true,
            message : "fetched all rating and reviews",
            data: getAllRating
        })
        
        
            
    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in getting all rating and reviews",
                error : errorMessage
            })
    }
}