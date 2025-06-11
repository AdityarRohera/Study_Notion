import express from 'express';
const courseRouter = express.Router();
import {isInstructor , userAuth} from '../middlewares/auth'

// middlewares for user verification
// courseRouter.use(userAuth);

// import course handler here
import { createCourse } from '../controllers/courseController';
courseRouter.post('/course' , createCourse);

export default courseRouter;