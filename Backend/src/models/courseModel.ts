import mongoose,{Schema , Model, ObjectId} from "mongoose";
import { resourceLimits } from "worker_threads";
const {ObjectId} = Schema.Types

interface CourseSchemaType {
    courseName : string;
    courseDesc : string;
    instructor : ObjectId;
    whatYouWillLearn : string;
    courseContent : ObjectId;
    avgRating : number;
    TotalNumberRated : number;
    price : number;
    thumbnail : string;
    category : ObjectId;
    numberOfStudentEnrolled : number;
}

const courseSchema : Schema<CourseSchemaType> = new Schema<CourseSchemaType>({
    courseName : {
        type : String,
        required : true,
        trim : true
    },
    courseDesc : {
        type : String,
        required : true,
        trim : true
    },
    instructor : {
        type : ObjectId,
        ref : 'User',
        required : true,
        trim : true
    },
    whatYouWillLearn : {
        type : String,
        required : true,
        trim : true
    },
    courseContent : [
        {
        type : ObjectId,
        ref : 'CourseSection',
        required : true,
        trim : true
        }
    ],
    avgRating : {
        type : Number,
        required : true,
        trim : true
    },
    TotalNumberRated : {
         type : Number,
         required : true,
         trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    thumbnail : {
         type : String,
         required : true,
         trim : true
    },
    category : [
        {
            type : ObjectId,
            ref : 'Tags'
        }
    ],
    numberOfStudentEnrolled : {
         type : Number,
         required : true,
         trim : true
    }

})

courseSchema.path('courseContent').validate((value) => {
    if(value.length > 20){
        return false;
    } else return true;
} , 'Cannot add more than 20 course sections.');

const courseModel : mongoose.Model<CourseSchemaType> = mongoose.model('Course' , courseSchema);
export default courseModel;