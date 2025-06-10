import mongoose,{Schema , Model, ObjectId} from "mongoose";
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
    tag : ObjectId;
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
    tag : [
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

const courseModel : mongoose.Model<CourseSchemaType> = mongoose.model('Course' , courseSchema);
export default courseModel;