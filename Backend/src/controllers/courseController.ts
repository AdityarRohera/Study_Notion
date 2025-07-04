import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { createCourse , findCategory , createSection ,createSubSection , updateSubSection, findSingleCourseByID } from "../utils/courseServises";
import courseModel from "../models/courseModel";


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
            const {sectionName , courseID} = req.body;

            // validation is pending

            // first find course
            const getCourse = await courseModel.findById(courseID);
            if(!getCourse){
                res.status(400).send({
                    success : false,
                    message : "Course not found for this Id"
                })
                return;
            }
            // if course get
            if(Array.isArray(getCourse?.courseContent) && getCourse.courseContent.length >= 20){
                res.status(400).send({
                    succes : false,
                    message : "You can not create more than 20 sections"
                })
                return;
            }

            // create subsection
            const createCourseSection = await createSection(sectionName);

            // update course content in course model
            getCourse.courseContent.push(courseID);
            await getCourse.save();

            // now return success responses
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

// pending total-lecture and 20 sub-section validation...
export const createCourseSubSectionHandler = async(req : Request , res : Response) => {
    try{
            const {subSectionName , description , duration ,  videoUrl , courseSectionId} = req.body;

            // validate subsection pending...

            // create sub sections
            const subSectionPayload = {subSectionName , description , duration , videoUrl};
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

// show all courses
// populate section and subsections is pending...
export const showallCoursesHandler = async(req : Request , res : Response) => {
    try{

        const findAllCourses = await courseModel.find({} , {courseName: true , courseDesc: true , instructor: true, whatYouWillLearn: true , courseContent: true ,price: true , thumbnail: true , category: true});

        // if we find courses than return response
        res.status(200).send({
            success : true,
            message : "Courses fetched",
            courses : findAllCourses
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
                message : "Error comes in show all courses",
                error : errorMessage
            })
    }
}

export const getSingleCourseHandler = async(req : Request , res : Response) => {
    try{

        const userReq = req as AuthenticatedRequest;
        const {userId} = userReq.user;
        const {courseId} = req.body;

        // validate course exist for this id or not 
        const getCourse = await findSingleCourseByID(courseId);

        if(!getCourse){
            res.status(400).send({
                success : false,
                message : "Course not exists for the provided Id"
            })
            return;
        }

        // now send success message with course
        res.status(200).send({
            success : true,
            message : "course fetched",
            course : getCourse
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
                message : "Error comes in course get single detailed course",
                error : errorMessage
            })
    }
}

// update section route pending
// delete section route pending
// update sub-section route pending
// delete sub-section route pending