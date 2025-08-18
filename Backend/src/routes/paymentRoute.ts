import express from 'express'
const paymentRoute = express.Router();

// payments route here
import { createPurchaseOder , verifyPayments } from '../controllers/paymentsController';
import { isStudent, userAuth } from '../middlewares/auth';

//middlewares
// paymentRoute.use();

paymentRoute.post('/create-order' , userAuth ,  createPurchaseOder);
paymentRoute.post('/verify-payment' , verifyPayments);

export default paymentRoute;
