import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface CourseSectionType {
    sectionName : string;
    totalLecture : number;
    subSection : ObjectId;
}

const courseSectionSchema : Schema<CourseSectionType> = new Schema<CourseSectionType>({
    sectionName : {
        type : String,
        required : true,
        trim : true
    },
    totalLecture : {
        type : Number,
        required : true,
        trim : true
    },
    subSection : [
        {
            type : ObjectId,
            ref : 'CourseSubSection',
            required : true,
            trim : true
        }
    ]
})

const courseSectionModel : mongoose.Model<CourseSectionType> = mongoose.model('CourseSection' , courseSectionSchema);
export default courseSectionModel;