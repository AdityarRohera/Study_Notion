import mongoose,{Schema , Model} from "mongoose";

interface OTPSchemaType {
    email : string,
    otp : string,
    createdAt : Date
}

const otpSchema : Schema<OTPSchemaType> = new Schema<OTPSchemaType>({
    email : {
        type : String,
        required : true,
        trim : true
    },
    otp : {
         type : String,
         required : true,
         trim : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 5*60
    }
})

const OtpModel : mongoose.Model<OTPSchemaType> = mongoose.model('OTP' , otpSchema);
export default OtpModel;