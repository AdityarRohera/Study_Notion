import mongoose,{Schema , Model, ObjectId} from "mongoose";
const {ObjectId} = Schema.Types

interface UserSchemaType {
    firstName : string;
    lastName : string;
    email : string;
    contact_no : string;
    password : string;
    resetPasswordToken : string | null;
    resetPasswordExpires : Date | null;
    account_type : string;
    additional_info : ObjectId;
    created_at : Date;
}

const userSchema: Schema<UserSchemaType> = new Schema<UserSchemaType>({
    firstName: {
        type : String,
        required : true,
        trim : true,
        min : 3 , max : 20
    },
    lastName: {
        type : String,
        required : true,
        trim : true,
        min : 3 , max : 20
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [100, 'Email cannot exceed 255 characters'],
    },
    contact_no: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    resetPasswordToken : {
        type : String,
        trim : true
    },
    resetPasswordExpires : {
        type : Date
    },
    account_type : {
        type : String,
        enum : ['Admin' , 'Student' , 'Instructor'],
        default : 'Student',
        required : true
    },
    additional_info : {
        type : ObjectId,
        ref : 'Profile',
        required : true
    },
    created_at : {
        type : Date,
        date : new Date()
    }
})

const userModel : mongoose.Model<UserSchemaType> = mongoose.model('User' , userSchema);

export default userModel;
