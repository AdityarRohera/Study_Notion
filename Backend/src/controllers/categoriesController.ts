import categoryModel from "../models/categoryModel";
import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";

export const createCategory = async(req : Request , res : Response) => {
    try{
        const {name , desc} = req.body;

        const createTag = await categoryModel.create({name , desc});
        res.status(200).send({
            success : true,
            message : "Tag created",
            tag : createTag.name
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
            tag : getCategories
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