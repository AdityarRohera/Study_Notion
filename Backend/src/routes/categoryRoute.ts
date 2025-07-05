import express from 'express'
const categoryRoute = express.Router();

// category routes here
import { createCategory , getAllCategoies , getAllCoursesOfCategory } from '../controllers/categoriesController';
import { userAuth } from '../middlewares/auth';

categoryRoute.post('/create-category' , userAuth , createCategory);
categoryRoute.get('/all-category' , userAuth , getAllCategoies);
categoryRoute.get('/category-courses' , userAuth , getAllCoursesOfCategory);

export default categoryRoute;