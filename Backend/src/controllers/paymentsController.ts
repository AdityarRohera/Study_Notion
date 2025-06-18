import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import instance from "../config/razerPayConfig";
import purchaseModel from "../models/purchaseModel";
import courseModel from "../models/courseModel";
import { findCourseByID } from "../utils/courseServises";
import userModel from "../models/userModel";
import { createOrderDb } from "../utils/purchaseServices";
import { verifyPaymentSignature } from "../utils/purchaseServices";

interface RazorpayOrderCreateRequestBody {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: {
    [key: string]: string;
  };
}

export const createPurchaseOder = async(req : Request , res : Response) => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const {userId} = userReq.user;
        const {amount , currency , courseId} = req.body;

        // basic validation is pending...

        // first validate userId
        const findUser = await userModel.findById(userId);
        if(!findUser){
            res.status(400).send({
                success : false,
                message : "Invalid user id"
            })
            return;
        }

        // validate courseId
        const findCourse = await findCourseByID(courseId);
        if(!findCourse){
            res.status(400).send({
                success : false,
                message : "Invalid course id"
            })
            return;
        }

        // validate course already purchase or not
        const checkPurchase = await purchaseModel.findOne(userId , courseId);
        if(checkPurchase && checkPurchase.status === 'Paid'){
            res.status(400).send({
                status : false,
                message : "You have already purchased this course"
            })
            return;
        }


        // now create order options
        const options : RazorpayOrderCreateRequestBody = {
            amount : amount *100,
            currency,
            receipt : (new Date(Date.now())).toString(),
            notes : {
                courseId : courseId,
            }
        }

        const createOrder = await instance.orders.create(options);

        // below code in update and create purchase model included notes is pending...
        // now update purchase order if status is created
        if(checkPurchase && checkPurchase.status === 'Created'){
            checkPurchase.updatedAt = new Date(Date.now());
            checkPurchase.razorpayOrderId = createOrder.id;
            checkPurchase.amount = amount;
            checkPurchase.save();
            res.status(200).send({
                success : true,
                message : "purchase order updated",
                amount: createOrder.amount,
                currency: createOrder.currency,
                courseID : createOrder.notes?.courseId,
                razorpayOrderId : createOrder.id,
                createPurchaseOrderId : checkPurchase._id
            })
            return;
        }

        // purchase entry is not found now create entry of purchase order in db

        const createOrderPayload = {userId , courseId , amount , razorpayOrderId:createOrder.id , razorpayPaymentId:null , razorpaySignature:null , status:'Created' as 'Created', updatedAt: new Date(Date.now())};

        const createPurchaseOdr = await createOrderDb(createOrderPayload);
        
           res.status(200).json({
               success : true,
               message : "Purchase Entry Created",
               amount: createOrder.amount,
               currency: createOrder.currency,
               courseId : createOrder.notes?.courseId,
               razorpayOrderId: createOrder.id,
               createPurchaseOrderId : createPurchaseOdr._id
           });
        

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in createPurchaseOrder",
                error : errorMessage
            })
    }
}

// now verify payments
export const verifyPayments = async(req : Request , res : Response) => {
    try{

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secretKey = process.env.KEY_SECRET!;

        const verifyPayload = {razorpay_order_id, razorpay_payment_id, razorpay_signature, secretKey}
         const isSignatureValid = verifyPaymentSignature(verifyPayload);

        if(!isSignatureValid){
             //  Payment failed return response
        }

        // Payment success now allow user for course
        // process of updation...
        // first update purchase model feilds -> (userId ,courseId , paymentId , signature , status , updated_at);
        // second update course model feild -> (no. of student's enrolled count);
        // send mail to user for course purcahse

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in verify payments",
                error : errorMessage
            })
    }
}
