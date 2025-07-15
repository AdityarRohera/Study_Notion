import express from 'express'
const categoryRoute = express.Router();

// category routes here
import { createCategory , getAllCategoies , getAllCoursesOfCategory } from '../controllers/categoriesController';
import { userAuth } from '../middlewares/auth';

// categoryRoute.use(userAuth);

categoryRoute.post('/create-category' , createCategory);
categoryRoute.get('/all-category' , getAllCategoies);
categoryRoute.get('/category-courses' , getAllCoursesOfCategory);

export default categoryRoute;