import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { findUserById } from "../utils/authServises";
import { findCourseByID } from "../utils/courseServises";
import { createRatingAndReview } from "../utils/ratingAndReviewServices";

// now create handler
export const ratingAndReviewHandler = async(req : Request , res : Response) => {
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