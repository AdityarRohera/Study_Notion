import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { createCourse , findCategory , createSection ,createSubSection , findSectionById, findSingleCourseByID , getDraftCourse } from "../utils/courseServises";
import courseModel from "../models/courseModel";
import courseSectionModel from "../models/courseSectionModel";
import mongoose from "mongoose";
import { updateSingleCourse } from "../utils/courseServises";
import courseSubSectionModel from "../models/CourseSubSection";
import { deleteFile } from "../utils/cloudinaryServies";
import { getPublicIdFromImageUrl } from "../utils/cloudinaryServies";



export const createAndUpdateCourseHandler = async(req : Request , res : Response) => {
    try{

            const {courseName , courseDesc , whatYouWillLearn , price , thumbnail , category , user} = req.body;
            console.log(courseName , courseDesc , whatYouWillLearn , price , thumbnail , category , user)
            const {course} = req.body;
            const categoryId = new mongoose.Types.ObjectId(category);
            const userId = new mongoose.Types.ObjectId(user);
            let courseId = null;
            if(course){
                 courseId = new mongoose.Types.ObjectId(course);
            }
            // console.log("Details -> " , courseName, courseDesc , whatYouWillLearn , price , thumbnail , category , user);

            // validation is pending
            // after validation
            const createCoursePayload = {
                courseName , courseDesc , instructor : userId , whatYouWillLearn , price , category , thumbnail
            }

            // check courseId is exist or not
                if(courseId){
                    const findCourseById = await updateSingleCourse(course, createCoursePayload);

                    if(findCourseById){
                        res.status(200).send({
                            succes : true,
                            message : "Course updated successfully",
                            course : findCourseById
                        })
                        return;
                    }
                    
                    if(!findCourseById){
                        res.status(400).send({
                            success : false,
                            message : "Invalid courseId"
                        })
                        return;
                    }
                }

            // check for category exist or not 
              const checkCategory = await findCategory(categoryId);
              if(!checkCategory){
                res.status(400).send({
                    success : false,
                    message : "category not found"
                })
                return;
              }

              // create course process

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
            const {sectionName , courseId} = req.body;

            // validation is pending

            // first find course
            const course_Id = new mongoose.Types.ObjectId(courseId);
            // console.log("Error in coversion -> " , course_Id , typeof(course_Id));
            const getCourse = await courseModel.findById(course_Id);
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
            getCourse.courseContent.push(createCourseSection._id);
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
            const {subSectionName , description , duration ,  videoUrl , courseSectionId , subSectionId , courseId} = req.body;
            console.log(subSectionName , description , duration ,  videoUrl , courseSectionId , subSectionId);

            

            // validate subsection pending...
            const courseID = new mongoose.Types.ObjectId(courseId);
            const sectionId = new mongoose.Types.ObjectId(courseSectionId);
            const subSectionID = new mongoose.Types.ObjectId(subSectionId);
             const subSectionPayload = {subSectionName , description , duration , videoUrl};

            // first check subSection id exist
            if(subSectionId){
                const updateSubSection = await courseSubSectionModel.findOneAndUpdate({_id : subSectionID} , subSectionPayload , {new : true});
                console.log(updateSubSection);
                if(!updateSubSection){
                    res.status(400).send({
                        status : false,
                        message : "Invalid course sub-section id"
                    })
                    return;
                }

                res.status(200).send({
                    sucess : true,
                    message : "Course lecture updated successfully"
                })
                return;
            }
            
            // validate course-section and 
            const findSection = await findSectionById(sectionId);
            console.log(findSection);
            if(!findSection){
                res.status(400).send({
                    success : false,
                    message : "Invalide course-section id"
                })
                return;
            }

            // if course-section id is valide then create-subsection into db
            const createCourseSubSection = await createSubSection(subSectionPayload);

            // update subSection in course section doucument
              findSection.subSection.push(createCourseSubSection._id);
              findSection.save();

              const findAndUpdateCourse = await courseModel.findOneAndUpdate({_id:courseID} , { $inc: { totalLength: duration} })
              if(!findAndUpdateCourse){
                res.status(400).send({
                    success : false,
                    message : "Invalide course-Id"
                })
                return;
              }

           // Now send success response
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

       const userReq = req as AuthenticatedRequest;
       const instructor = userReq.user.userId;
       const instructorId = new mongoose.Types.ObjectId(instructor);

    //    console.log(instructorId)

        const findAllCourses = await courseModel.find({instructor:instructorId} , {courseName: true , courseDesc: true , instructor: true, whatYouWillLearn: true ,price: true , thumbnail: true , category: true , totalLength: true , status: true});

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

        // const userReq = req as AuthenticatedRequest;
        // const {userId} = userReq.user;
        const courseId = req.params['id'];

        // validate course exist for this id or not 
        const getCourse = await findSingleCourseByID(new mongoose.Types.ObjectId(courseId));

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

export const getDraftCourseHandler = async(req : Request , res : Response) => {
    try{    

        console.log("Insidegetting draft course handler")
         const userReq = req as AuthenticatedRequest;
         const instructor = userReq.user.userId;
         const instructorId = new mongoose.Types.ObjectId(instructor);
         console.log(instructor)

         if(!instructor){
             res.status(400).send({
                status : false,
                message : "Instructor id required"
             })
             return;
         }

        // search for draft course
        const getFullDraftCourse = await getDraftCourse(instructorId);
        if(!getFullDraftCourse){
            res.status(400).send({
                success : false,
                message : "No Draft course available"
            })
            return;
        }

        res.status(200).send({
            success : true,
            message : "Course fetched",
            course : getFullDraftCourse
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

export const publishCourseHandler = async(req : Request , res : Response) => {
    try{

       const userReq = req as AuthenticatedRequest;
       const instructor = userReq.user.userId;
       const instructorId = new mongoose.Types.ObjectId(instructor);
       console.log(instructorId)

       const findDraftCourse = await courseModel.findOneAndUpdate({instructor : instructor , status : "Draft" as "Draft"} , {status : 'Published' as 'Published'} , {new: true});
       console.log(findDraftCourse);
       if(!findDraftCourse){
            res.status(400).send({
                status : false,
                message : "Draft course not found"
            })
            return;
       }

        res.status(200).send({
            success : true,
            message : "Course Published successfully",
            course : findDraftCourse
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

export const deleteDraftCourseHandler = async(req : Request , res : Response) => {
    try{

       const userReq = req as AuthenticatedRequest;
       const instructor = userReq.user.userId;
       const instructorId = new mongoose.Types.ObjectId(instructor);

       // first find draft course of instructor

        const getFullDraftCourse = await getDraftCourse(instructorId);
        if(!getFullDraftCourse){
            res.status(400).send({
                success : false,
                message : "No Draft course available"
            })
            return;
        }
        
       // second delete thumbnail from cloudinary if thumbnail exists

        // 2. Delete thumbnail from Cloudinary
        if (getFullDraftCourse.thumbnail) {
                try {

                  const publicId = decodeURIComponent(getPublicIdFromImageUrl(getFullDraftCourse.thumbnail));
                  const deleteImage = await deleteFile({ public_id: publicId, resource_type: "image" });

                  if (deleteImage.result !== "ok") {
                     res.status(400).json({ success: false, message: "Cloudinary file not found" });
                     return;
                  }

                } catch (err) {
                  console.error("Cloudinary delete failed:", err);
                }
        }  
       
       // thirt delete full course with all it's contend and subcontent

       if (getFullDraftCourse.courseContent.length) {
            // 1. Find all sections for this course
            const sections = await courseSectionModel.find({
              _id: { $in: getFullDraftCourse.courseContent },
            });

            console.log("All course sections -> " , sections);
        
            // 2. Collect all subContent ids
            const allSubContentIds = sections.flatMap(sec => sec.subSection);
            console.log("all sub-section Ids -> " , allSubContentIds)
        
            // 3. Delete all subContents
            if (allSubContentIds.length) {
              await courseSubSectionModel.deleteMany({ _id: { $in: allSubContentIds } });
            }
        
            // 4. Delete all sections
            await courseSectionModel.deleteMany({ _id: { $in: getFullDraftCourse.courseContent } });
        }

            // fourth delete course itself
            await courseModel.findByIdAndDelete(getFullDraftCourse._id);


            // last return success response
             res.status(200).send({
                 success : true,
                 message : "Course Deleted successfully",
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
                message : "Error comes in dlete draft course",
                error : errorMessage
            })
    }
}

export const getCourseSubSectionHandler = async(req : Request , res : Response) => {
    try{

    //    const userReq = req as AuthenticatedRequest;
        console.log("Inside getting section")
         const sectionId = req.params['id'];
        //  console.log(sectionId)

         const sectionID = new mongoose.Types.ObjectId(sectionId)
        //  console.log(sectionID , typeof(sectionID))

         if(!sectionId){
            res.status(400).send({
                success : false,
                message : "required sectionId"
            })
            return;
         }
         const getCourseSubSection = await courseSectionModel.findOne({_id : sectionID}).populate({path : "subSection"}).exec();

         if(!getCourseSubSection){
            res.status(400).send({
                success : false,
                message : "Invalid sectionId"
            })
            return;
         }
       

        res.status(200).send({
            success : true,
            message : "subsections fetched successfully",
            Section :getCourseSubSection
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
                message : "Error comes in finding course section",
                error : errorMessage
            })
    }
}
