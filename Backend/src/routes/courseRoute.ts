import express from 'express';
const courseRouter = express.Router();
import {isInstructor , userAuth} from '../middlewares/auth'

// middlewares for user verification
// courseRouter.use(userAuth);

// import course handler here
import { createCourseHandler , createCourseSectionHandler , createCourseSubSectionHandler , showallCoursesHandler , getSingleCourseHandler } from '../controllers/courseController';

courseRouter.post('/create-course' , userAuth , isInstructor , createCourseHandler);
courseRouter.post('/create-section' , userAuth , isInstructor , createCourseSectionHandler);
courseRouter.post('/create-subsection' ,userAuth , isInstructor , createCourseSubSectionHandler);
courseRouter.get('/get-course' , userAuth , isInstructor , getSingleCourseHandler);

export default courseRouter;