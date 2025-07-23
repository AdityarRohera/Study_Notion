import categoryModel from "../models/categoryModel";
import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import courseModel from "../models/courseModel";
import mongoose from "mongoose";

export const createCategory = async(req : Request , res : Response) => {
    try{
        const {name} = req.body;

        // name validattion is pending

        const createTag = await categoryModel.create({name});
        res.status(200).send({
            success : true,
            message : "Tag created",
            category : createTag.name
        })

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in create categories",
                error : errorMessage
            })
    }
}

export const getAllCategoies = async(req : Request , res : Response) => {
    try{

        const getCategories = await categoryModel.find({} , {name:true , desc:true});
        res.status(200).send({
            success : true,
            message : "Tag fatched",
            categories : getCategories
        })

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in create categories",
                error : errorMessage
            })
    }
}

// testing pending
export const getAllCoursesOfCategory = async(req : Request , res : Response) => {
    try{ 

        const categoryIdString = req.query.categoryId;

        if (!categoryIdString || typeof categoryIdString !== 'string') {
            res.status(400).json({success : false ,  message: "Invalid category ID" });
            return;
        }

        const categoryId = new mongoose.Types.ObjectId(categoryIdString);

        // validate the structure of id is pending...

        // first validate category id
        const checkCategory = await categoryModel.findById(categoryId);
        if(!checkCategory){
            res.status(400).send({
                success : false,
                message : `Category not found for this category Id -> ${categoryId}`
            })
            return;
        }

        // if valide category then find courses for this category
        const findCategoryCourses = await courseModel.find({category : categoryId})
        .populate({path : 'instructor' , select : 'firstName lastName'}).exec();

        if(findCategoryCourses.length === 0){
            res.status(200).send({
                success : true,
                message : `No Course exists now for this category -> ${categoryId}`
            })
            return;
        }

        // if courses found now find some more courses for recommendation
        const findMorecourses = await courseModel.find({category : {$ne : categoryId}})
        .populate({path : 'instructor' , select : 'firstName lastName'})
        .sort({ 'created_at': -1 })
        .limit(5)
        .exec();

        // Now find top selling courses
        const findTopSellingCourses = await courseModel.find({numberOfStudentEnrolled : {$gt : 5}})
        .populate({path : 'instructor' , select : 'firstName lastName'})
        .exec();

        // now send category response
        res.status(200).send({
            success : true,
            message : "courses fetched for particular category",
            data : {
                categoryCourses : findCategoryCourses,
                someMoreCourses : findMorecourses,
                topSellingCourses : findTopSellingCourses
            }
        })


    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in get courses by category",
                error : errorMessage
            })
    }
}