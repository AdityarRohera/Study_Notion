import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;
import fileUpload from 'express-fileupload'

// middlewares
app.use(express.json());
app.use(fileUpload({
   useTempFiles : true,
  tempFileDir : '/tmp/'
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
import uploadRouter from './routes/fileUploadRoute'
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/' , courseRouter);
app.use('/api/v1/upload' , uploadRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})