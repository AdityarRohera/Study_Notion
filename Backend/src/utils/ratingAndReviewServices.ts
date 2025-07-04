import mongoose from "mongoose";
import ratingAndReviewModel from "../models/RatingAndReviewModel";


interface RatingAndReviewType {
    userId : mongoose.Types.ObjectId;
    courseId : mongoose.Types.ObjectId;
    rating : number;
    review : string;
}

export const createRatingAndReview = async(ratingAndReviewPayload : RatingAndReviewType) => {
    return await ratingAndReviewModel.create(ratingAndReviewPayload);
}

export const checkCourseReviewed = async(userId : mongoose.Types.ObjectId , courseId:mongoose.Types.ObjectId) => {
    return await ratingAndReviewModel.findOne({userId , courseId});
}

export const getAllRatingOFCourse = async(courseId : mongoose.Types.ObjectId) => {
    return await ratingAndReviewModel.findById(courseId)
    .populate({path: 'user' , select :"firstName lastName email"})
    .populate({path : 'course' , select:"courseName"}).exec() , 
    {new : true};
}