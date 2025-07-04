import express from 'express';
const userRouter = express.Router();

// import all user routes here 
import { sendOTP, signup , signin } from '../controllers/userController';
import { resetPasswordToken , resetPasswordVerification } from '../controllers/resetPasswordController';
userRouter.post('/send-otp' , sendOTP)
userRouter.post('/signup' , signup);
userRouter.post('/signin' , signin);
userRouter.post('/reset-password' , resetPasswordToken);
userRouter.post ('/reset-password-verify' , resetPasswordVerification);

export default userRouter;