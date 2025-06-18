import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface RatingAndReviewType {
    courseId : ObjectId;
    userId : ObjectId;
    rating : number;
    review : string;
    created_at : Date;
}

const ratingAndReviewSchema : Schema<RatingAndReviewType> = new Schema<RatingAndReviewType>({
    courseId : {
        type : ObjectId,
        ref : 'Course',
        required : true
    },
    userId : {
        type : ObjectId,
        ref : 'user',
        required : true
    },
    rating : {
        type : Number,
        required : true,
        trim : true,
        min : [1 , 'Rating could not be less than 1'],
        max : [5 , 'Rating could not exceed 5']
    },
    review : {
         type : String,
         required : true,
         trim : true
    },
    created_at : {
        type : Date,
        date : new Date()
    }
})

const ratingAndReviewModel : mongoose.Model<RatingAndReviewType> = mongoose.model('RatingAndReview' , ratingAndReviewSchema);
export default ratingAndReviewModel;