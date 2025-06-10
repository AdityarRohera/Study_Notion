import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// database connect here
import dbConnect from './config/dnConnect';
dbConnect();

// all api routes here
import userRouter from './routes/userRoute';
app.use('/api/v1/user' , userRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})