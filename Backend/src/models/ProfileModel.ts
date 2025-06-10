import mongoose,{Schema , Model} from "mongoose";

interface profileSchemaType {
    gender : string;
    dateOfBirth : Date;
    about : string;
}

const profileSchema : Schema<profileSchemaType> = new Schema<profileSchemaType>({
    gender : {
        type : String,
        enum : ['Male' , 'Female'],
    },
    dateOfBirth : {
        type : Date,
        trim : true
    },
    about : {
        type : String,
        trim : true,
        minlength : [5 , 'about must be at least 5 characters long'],
        maxlength : [255 , 'about cannot exceed 255 characters']
    }
})

const profileModel : mongoose.Model<profileSchemaType> = mongoose.model('Profile' , profileSchema);
export default profileModel;