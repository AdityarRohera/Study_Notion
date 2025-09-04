import express from 'express'
const purchaseRoute = express.Router();

import { isStudent, userAuth } from '../middlewares/auth';

// import controller here
import { getEnrolledCourses } from '../controllers/purchaseController';
purchaseRoute.get('/enrolled-courses' , userAuth , isStudent , getEnrolledCourses);

export default purchaseRoute;