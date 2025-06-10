import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface RatingAndReviewType {
    courseId : ObjectId;
    userId : ObjectId;
    rating : number;
    review : string;
}

const ratingAndReviewSchema : Schema<RatingAndReviewType> = new Schema<RatingAndReviewType>({
    courseId : {
        type : ObjectId,
        ref : 'Course',
        required : true
    },
    userId : {
        type : ObjectId,
        ref : 'User',
        required : true
    },
    rating : {
        type : Number,
        required : true,
        trim : true
    },
    review : {
         type : String,
         required : true,
         trim : true
    }
})

const ratingAndReviewModel : mongoose.Model<RatingAndReviewType> = mongoose.model('RatingAndReview' , ratingAndReviewSchema);
export default ratingAndReviewModel;