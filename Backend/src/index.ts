import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;
import fileUpload from 'express-fileupload'
import cors from 'cors'

// middlewares
app.use(express.json());
app.use(fileUpload({
   useTempFiles : true,
  tempFileDir : '/tmp/'
}))

app.use(cors({
  origin : "http://localhost:5173",
   optionsSuccessStatus: 200
}))

// database connect here
import dbConnect from './config/dnConnect';
dbConnect();
// clodinary connect here
// connect to cloudinary
import cloudinaryConnect from './config/cloudinaryConnect';
cloudinaryConnect();

// all api routes here
import userRouter from './routes/userRoute';
import courseRouter from './routes/courseRoute';
import uploadRouter from './routes/fileUploadRoute';
import contactRoute from './routes/contactUsRoute';
import categoryRoute from './routes/categoryRoute';
import paymentRoute from './routes/paymentRoute';
import purchaseRoute from './routes/purchaseRoute';
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/course' , courseRouter);
app.use('/api/v1/upload' , uploadRouter);
app.use('/api/v1' , contactRoute);
app.use('/api/v1' , categoryRoute);
app.use('/api/v1/payment' , paymentRoute);
app.use('/api/v1/purchase' , purchaseRoute);

app.listen(port, async() => {
  console.log(`App listening on port ${port}`);
})