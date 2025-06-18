import express from 'express';
const uploadRouter = express.Router();

// import { userAuth } from '../middlewares/auth';
// uploadRouter.use(userAuth);

// import course handler here
import { imageUploadToCloudinary } from '../controllers/uploadToCloudinaryController';
uploadRouter.post('/fileUpload' , imageUploadToCloudinary);
uploadRouter.get('/test' , (req , res) => {res.send({test : "pass"})});

export default uploadRouter;