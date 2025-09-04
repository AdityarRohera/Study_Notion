import mongoose , {ObjectId, Schema} from "mongoose";
const {ObjectId} = Schema.Types;

interface purchaseSchemaType {
    userId : ObjectId;
    courseId : ObjectId;
    amount : number;
    razorpayOrderId : string | null;
    razorpayPaymentId : string | null;
    razorpaySignature : string | null;
    failureReason : string | null;
    notes : object;
    status : 'Created' | 'Paid' | 'Attempted' | 'Failed';
    createdAt : Date;
    updatedAt : Date;
}

const purchaseSchema : Schema<purchaseSchemaType> = new Schema<purchaseSchemaType>({
    userId : {
        type : ObjectId,
        required : true
    },
    courseId : {
        type : ObjectId,
        ref : 'course',
        required : true
    },
    amount : {
        type : Number,
        requied : true
    },
    razorpayOrderId : {
        type : String,
        trim : true
    },
    razorpayPaymentId : {
         type : String,
         trim : true
    },
     razorpaySignature : {
        type : String,
        trim : true
     },
     failureReason : {
        type : String,
        trim : true
     },
     notes : {
        type : Object,
        default : {}
     },
     status : {
        type : String,
        required : true
     },
     createdAt : {
        type : Date,
        date : new Date()
     },
     updatedAt : {
        type : Date
     }
});

const purchaseModel : mongoose.Model<purchaseSchemaType> = mongoose.model('purchases' , purchaseSchema);
export default purchaseModel;