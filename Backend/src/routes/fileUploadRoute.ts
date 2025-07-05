import express from 'express';
const uploadRouter = express.Router();
import { userAuth , isInstructor } from '../middlewares/auth';


// import course handler here
import { imageUploadToCloudinary , videoUploadToCloudinary } from '../controllers/uploadToCloudinaryController';
// , userAuth , isInstructor 
uploadRouter.post('/image-upload', userAuth , isInstructor , imageUploadToCloudinary);
uploadRouter.post('/video-upload', userAuth , isInstructor , videoUploadToCloudinary);
// uploadRouter.post('/videoUpload')
uploadRouter.get('/test' , (req , res) => {res.send({test : "pass"})});

export default uploadRouter;