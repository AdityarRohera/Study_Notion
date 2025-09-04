import express from 'express';
const courseRouter = express.Router();
import {isInstructor , userAuth} from '../middlewares/auth'

// middlewares for user verification
// courseRouter.use(userAuth);

// import course handler here
import { createAndUpdateCourseHandler , createCourseSectionHandler , createCourseSubSectionHandler , showallCoursesHandler , getSingleCourseHandler ,getDraftCourseHandler , publishCourseHandler , getCourseSubSectionHandler } from '../controllers/courseController';

courseRouter.post('/create-course' , createAndUpdateCourseHandler);
courseRouter.post('/create-section'  , createCourseSectionHandler);
courseRouter.post('/create-subsection' , createCourseSubSectionHandler);
courseRouter.get('/get-course/:id' , getSingleCourseHandler);
courseRouter.get('/draft-course' , getDraftCourseHandler);
courseRouter.patch('/publish-course' , userAuth , isInstructor , publishCourseHandler);
courseRouter.get('/get-courses' , userAuth , isInstructor , showallCoursesHandler);
courseRouter.get('/get-section/:id', getCourseSubSectionHandler);

export default courseRouter;