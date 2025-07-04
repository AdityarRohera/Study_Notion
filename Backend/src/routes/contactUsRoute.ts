import {Express, Router} from "express";
const contactRoute = Router();

// import route here
import { contactUsHandler } from "../controllers/contactUsController";
contactRoute.use('/contact-us' , contactUsHandler);

export default contactRoute;