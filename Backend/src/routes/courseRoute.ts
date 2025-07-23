import express from 'express';
const courseRouter = express.Router();
import {isInstructor , userAuth} from '../middlewares/auth'

// middlewares for user verification
// courseRouter.use(userAuth);

// import course handler here
import { createCourseHandler , createCourseSectionHandler , createCourseSubSectionHandler , showallCoursesHandler , getSingleCourseHandler } from '../controllers/courseController';

courseRouter.post('/create-course' , createCourseHandler);
courseRouter.post('/create-section'  , createCourseSectionHandler);
courseRouter.post('/create-subsection' , createCourseSubSectionHandler);
courseRouter.get('/get-course/:id' , getSingleCourseHandler);

export default courseRouter;