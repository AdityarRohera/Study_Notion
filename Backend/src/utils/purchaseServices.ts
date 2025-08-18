import mongoose from "mongoose"
import purchaseModel from "../models/purchaseModel";
import crypto from 'crypto';


interface CreateOrderType {
    userId : mongoose.Types.ObjectId;
    courseId : mongoose.Types.ObjectId;
    amount : number;
    razorpayOrderId : string | null;
    razorpayPaymentId : string | null;
    razorpaySignature : string | null;
    status : 'Created' | 'Paid' | 'Failed';
    updatedAt : Date;
}

interface verifyPayloadType {
    razorpay_order_id : string,
    razorpay_payment_id : string,
    razorpay_signature : string,
    secretKey : string
}

interface SuccessPaymentType {
    userId : mongoose.Types.ObjectId;
    courseId : mongoose.Types.ObjectId;
}

export const createOrderDb = async(createOrderPayload : CreateOrderType) => {
    return await purchaseModel.create(createOrderPayload);
}

export const verifyPaymentSignature = ({razorpay_order_id, razorpay_payment_id, razorpay_signature, secretKey} : verifyPayloadType) => {
     const generatedSignature = crypto.createHmac('sha256' ,secretKey)
     .update(razorpay_order_id + "|" + razorpay_payment_id)
     .digest('hex');
     console.log(generatedSignature);
     if(generatedSignature === razorpay_signature) return true;
     else return false;
}

export  const updatePurchaseOrder = async({userId , courseId} : SuccessPaymentType) => {
        return await purchaseModel.findOne({userId , courseId});
}

export const checkPurchasedCourse = async(userId: mongoose.Types.ObjectId , courseId:mongoose.Types.ObjectId) => {
   const findPurchased =  await purchaseModel.findOne({userId , courseId} , {new:true});
   if(findPurchased?.status === 'Paid'){
        return findPurchased
   } else return null;
}
