import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface CourseSectionType {
    sectionName : string;
    totalLecture : number;
    subSection : ObjectId[];
}

const courseSectionSchema : Schema<CourseSectionType> = new Schema<CourseSectionType>({
    sectionName : {
        type : String,
        required : true,
        trim : true
    },
    totalLecture : {
        type : Number,
        default : 0,
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

// subSection validation
courseSectionSchema.path('subSection').validate(value => {
    if(value.length >= 20){
        return false
    }
    return true;
} , 'Cannot add more than 20 course sub-sections.')

const courseSectionModel : mongoose.Model<CourseSectionType> = mongoose.model('courseSection' , courseSectionSchema);
export default courseSectionModel;