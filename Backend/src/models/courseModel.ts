import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface CourseSchemaType {
    courseName : string;
    courseDesc : string;
    instructor : ObjectId;
    whatYouWillLearn : string;
    courseContent : mongoose.Types.ObjectId[];
    totalSum : number;
    TotalNumberRated : number;
    price : number;
    thumbnail : string;
    category : ObjectId;
    numberOfStudentEnrolled : number;
    status : string;
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
        ref : 'courseSection',
        required : true,
        trim : true
        }
    ],
    totalSum : {
        type : Number,
        trim : true,
        default : 0
    },
    TotalNumberRated : {
         type : Number,
         trim : true,
         default : 0
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
    category :{
            type : ObjectId,
            ref : 'categories'
    },
    numberOfStudentEnrolled : {
         type : Number,
         trim : true
    },
    status : {
        type : String,
        enum : ['Draft' , 'Published']
    }

})

courseSchema.path('courseContent').validate((value) => {
    if(value.length >= 20){
        return false;
    } else return true;
} , 'Cannot add more than 20 course sections.');

const courseModel : mongoose.Model<CourseSchemaType> = mongoose.model('course' , courseSchema);
export default courseModel;