import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import instance from "../config/razerPayConfig";
import purchaseModel from "../models/purchaseModel";
import courseModel from "../models/courseModel";
import { findCourseByID } from "../utils/courseServises";
import userModel from "../models/userModel";
import { createOrderDb } from "../utils/purchaseServices";
import { verifyPaymentSignature , updatePurchaseOrder } from "../utils/purchaseServices";
import mailSender from "../utils/mailSender";
import crypto from 'crypto';

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
        console.log("Inside create-order" ,userId)
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
        const checkPurchase = await purchaseModel.findOne({userId , courseId});
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
            receipt : `receipt_${Date.now()}`,
            notes : {
                courseId : courseId,
                userId : userId
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
        console.log(err);
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

// // now verify payments
// export const verifyPayments = async(req : Request , res : Response) => {
//     try{
//         console.log("Inside verify payment");
//         const userReq = req as AuthenticatedRequest;
//         const {userId} = userReq.user;
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature , courseId , email} = req.body;
//         console.log("captured payment details" , razorpay_order_id , razorpay_payment_id , razorpay_signature);
//         const secretKey = process.env.KEY_SECRET!;
//         console.log("Secret key inside verify payment" , secretKey);

//         const verifyPayload = {razorpay_order_id, razorpay_payment_id, razorpay_signature, secretKey}
//          const isSignatureValid = verifyPaymentSignature(verifyPayload);

//         if(!isSignatureValid){
//              //  Payment failed return response
//              res.status(400).send({
//                 status : false,
//                 message : "Payment not verified",
//              })
//              return;
//         }

//         // Payment success now allow user for course
//         // process of updation...
//         // first update purchase model feilds -> (userId ,courseId , paymentId , signature , status , updated_at);
//         const successPaymentPayload = {
//             userId,
//             courseId,
//             razorpay_payment_id,
//             razorpay_signature,
//         }
//         const updatedOrderStatus = await updatePurchaseOrder(successPaymentPayload);
//         if(updatedOrderStatus){
//             updatedOrderStatus.updatedAt = new Date(Date.now());
//             updatedOrderStatus.razorpayPaymentId = razorpay_payment_id;
//             updatedOrderStatus.razorpaySignature = razorpay_signature;
//             updatedOrderStatus.status = 'Paid' as 'Paid';
//             await updatedOrderStatus.save();
//         }

//         // second update course model feild -> (no. of student's enrolled count);
//         const getCourse = await findCourseByID(courseId);
//         // if(getCourse){
//         //     getCourse.numberOfStudentEnrolled++;
//         //     await getCourse.save();
//         // } // do later currently number on course not included
//         // send mail to user for course purcahse
//         const mailBody = {
//             email,
//             title : `Successfully Purchased course on StudyNotion`,
//             body : `Thanks for purchasing course ${getCourse?.courseName} from studyNotion`
//         }
//          await mailSender(mailBody); 

//          res.status(200).send({
//             status : 'success',
//             message : 'course purchased successfully on StudyNotion'
//          })

//     } catch(err : unknown){
//         let errorMessage;
//             if(err instanceof Error){
//                 errorMessage = err.message
//             } else if(typeof(err) === 'string'){
//                 errorMessage = err
//             }
//             res.status(500).send({
//                 success : false,
//                 message : "Error comes in verify payments",
//                 error : errorMessage
//             })
//     }
// }



export const verifyPayments = async(req : Request , res : Response) => {
    try{
        console.log("Inside verify payment");
        const secretKey = process.env.KEY_SECRET!;

         const razorpay_signature = req.headers['x-razorpay-signature'];
         console.log("signature by razorpay -> " , razorpay_signature);

            const expectedSignature = crypto
             .createHmac("sha256", secretKey)
             .update(JSON.stringify(req.body)) // body is Buffer
             .digest("hex");

             console.log("I created signature for match -> " , expectedSignature);

                if(expectedSignature !== razorpay_signature){
                    res.status(400).send({
                        status : "success",
                        message : "Invalid signature"
                    })
                    return;
                }

                    res.status(200).send({
                    status : 'success',
                    message : 'course purchased successfully on StudyNotion'
                    }) 

                  // if signature verified
                   const data = req.body;
                   console.log(JSON.stringify(data));

                   const paymentId = data.payload.payment.entity.id;
                   const orderId = data.payload.payment.entity.order_id;
                   const {email} = data.payload.payment.entity

                   console.log("💳 Payment ID:", paymentId);
                   console.log("🧾 Order ID:", orderId); 
                 

        // Payment success now allow user for course
        // process of updation...
        // first update purchase model feilds -> (userId ,courseId , paymentId , signature , status , updated_at);
        const {userId , courseId} = data.payload.payment.entity.notes
        const updatedOrderStatus = await updatePurchaseOrder({userId , courseId});
        if(updatedOrderStatus){
            updatedOrderStatus.updatedAt = new Date(Date.now());
            updatedOrderStatus.razorpayPaymentId = paymentId;
            updatedOrderStatus.razorpaySignature = razorpay_signature;
            updatedOrderStatus.status = 'Paid' as 'Paid';
            await updatedOrderStatus.save();
        }

        // // second update course model feild -> (no. of student's enrolled count);
        // const getCourse = await findCourseByID(courseId);
        // if(getCourse){
        //     getCourse.numberOfStudentEnrolled++;
        //     await getCourse.save();
        // } // do later currently number on course not included
        // send mail to user for course purcahse
        const {description} = data.payload.payment.entity
        const mailBody = {
            email,
            title : `Successfully Purchased course on StudyNotion`,
            body : `Thanks for purchasing course ${description} from studyNotion`
        }
         await mailSender(mailBody);

    } catch(err : unknown){
        console.log("inside error of verify-route");
        console.log(err);
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
