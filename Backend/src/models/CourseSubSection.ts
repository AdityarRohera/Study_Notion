import mongoose,{Schema , Model, ObjectId} from "mongoose";

interface CourseSubSectionType {
    subSectionName : string;
    description : string;
    duration : number;
}

const courseSectionSchema : Schema<CourseSubSectionType> = new Schema<CourseSubSectionType>({
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

const courseSectionModel : mongoose.Model<CourseSubSectionType> = mongoose.model('CourseSection' , courseSectionSchema);
export default courseSectionModel;