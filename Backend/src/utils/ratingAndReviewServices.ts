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