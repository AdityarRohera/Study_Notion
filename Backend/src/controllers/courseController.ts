import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { UploadedFile, FileArray } from 'express-fileupload';
import {fileTypeFromFile} from 'file-type';
import { uploadFile , isFileSupport } from "../utils/cloudinaryServies";
import { createCourse , findCategory , createSection , updateCourseContent ,createSubSection , updateSubSection } from "../utils/courseServises";

export const imageUploadToCloudinary = async(req : Request , res : Response) => {
    try{
        console.log("inside image upload")
        const files = req.files as FileArray;
        const imageFile = files.imageFile as UploadedFile;

        if (!req.files || !('imageFile' in req.files)) {
                 res.status(400).send({
                 success: false,
                 message: "imageFile required"
                 });
            }

            console.log(imageFile);

            // checking file type
             const fileType =  await fileTypeFromFile(imageFile.tempFilePath);
             console.log(fileType);

             if(!fileType?.mime.startsWith('image')){
                res.status(400).send({
                    success : false,
                    message : `${fileType?.mime} file is not supported`
                })
                return;
             }

             // now check imageFile supported or not
            const imageSupport = ['jpg' , 'jpeg' , 'png' , 'svg'];
            if(!isFileSupport(fileType.ext.toLowerCase() , imageSupport)){
                 res.status(400).send({
                    success : false,
                    message : `image type ${fileType.ext.toLowerCase()} is not supported`
                })
                return;
            }

            // now upload to cloudinary
            const uploadPayload = {file : imageFile , fileType: "image" as "image"}
            const uploadImage = await uploadFile(uploadPayload);

             res.status(200).send({
                success : true,
                message : "Image uploaded",
                secure_url: uploadImage.secure_url
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
                message : "Error comes in fileupload",
                error : errorMessage
            })
    }
}

export const createCourseHandler = async(req : Request , res : Response) => {
    try{
            const userReq = req as AuthenticatedRequest;
            const {userId} = userReq.user;
            const {courseName , courseDesc , whatYouWillLearn , price , thumbnail , category} = req.body;

            // validation is pending

            // check for category exist or not 
              const checkCategory = await findCategory(category);
              if(checkCategory){
                res.status(400).send({
                    success : false,
                    message : "category not found"
                })
                return;
              }

              // create course process
            const createCoursePayload = {
                courseName , courseDesc , instructor : userId , whatYouWillLearn , price , category , thumbnail
            }

            const createdCourse = await createCourse(createCoursePayload);
            res.status(200).send({
                success : true,
                message : "course created successfully",
                courseId : createdCourse._id
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
                message : "Error comes in create course",
                error : errorMessage
            })
    }
}

export const createCourseSectionHandler = async(req : Request , res : Response) => {
    try{
            const {sectionName , totalLecture , courseID} = req.body;

            // validation is pending

            // create subsection
            const createSectionPayload = {sectionName , totalLecture};
            const createCourseSection = await createSection(createSectionPayload);

            // update course content in course model
            await updateCourseContent(courseID ,createCourseSection._id);
            res.status(200).send({
                sucess : true,
                message : "course section created",
                courseSectionId : createCourseSection._id
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
                message : "Error comes in create course sections",
                error : errorMessage
            })
    }
}

export const createCourseSubSectionHandler = async(req : Request , res : Response) => {
    try{
            const {subSectionName , description , duration , courseSectionId} = req.body;

            // validate subsection pending...

            // create sub sections
            const subSectionPayload = {subSectionName , description , duration};
            const createCourseSubSection = await createSubSection(subSectionPayload);

            // update subSection in course section doucument
            await updateSubSection(courseSectionId , createCourseSubSection._id);
            res.status(200).send({
                success : true,
                message : "course sub-section created",
                courseSubSectionId : createCourseSubSection._id
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
                message : "Error comes in course sub-section",
                error : errorMessage
            })
    }
}