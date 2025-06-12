import mongoose,{Schema , Model, ObjectId} from "mongoose";

interface CourseSubSectionType {
    subSectionName : string;
    description : string;
    duration : number;
}

const courseSubSectionSchema : Schema<CourseSubSectionType> = new Schema<CourseSubSectionType>({
    subSectionName : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    duration : {
        type : Number,
        required : true,
        trim : true
    }
})

const courseSubSectionModel : mongoose.Model<CourseSubSectionType> = mongoose.model('CourseSubSection' , courseSubSectionSchema);
export default courseSubSectionModel;