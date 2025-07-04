import express from 'express';
const uploadRouter = express.Router();
import { userAuth , isInstructor } from '../middlewares/auth';


// import course handler here
import { imageUploadToCloudinary } from '../controllers/uploadToCloudinaryController';
// , userAuth , isInstructor 
uploadRouter.post('/imageUpload', imageUploadToCloudinary);
// uploadRouter.post('/videoUpload')
uploadRouter.get('/test' , (req , res) => {res.send({test : "pass"})});

export default uploadRouter;