import mongoose from "mongoose";
import courseModel from "../models/courseModel";
import categoryModel from "../models/categoryModel";
import courseSectionModel from "../models/courseSectionModel";
import courseSubSectionModel from "../models/CourseSubSection";
import path from "path";

interface CreateCourseType {
    courseName : string;
    courseDesc : string;
    whatYouWillLearn : string;
    price : number;
    thumbnail : string;
    category : mongoose.Types.ObjectId;
}

interface CreateSubSectionType {
    subSectionName : string;
    description : string;
    duration : number;
    videoUrl : string;
}

export const findCategory = async(categoryId :mongoose.Types.ObjectId) => {
    console.log("Inside FindCategory function -> " , categoryId , typeof(categoryId))
    return await categoryModel.findById(categoryId);
}

export const createCourse = async(createCoursePayload : CreateCourseType) => {
    const createCourse = await courseModel.create(createCoursePayload);
    return createCourse;
}

export const createSection = async(sectionName : string) => {
    return await courseSectionModel.create({sectionName});
}

// export const updateCourseContent = async (courseId : mongoose.Types.ObjectId , sectionId : mongoose.Types.ObjectId) => {
//     return await courseModel.findByIdAndUpdate(
//         courseId ,
//         {
//             $push : {courseContent : sectionId}
//         } ,
//         {new : true}).exec();
// }

export const createSubSection = async(subSectionPayload : CreateSubSectionType) => {
    return await courseSubSectionModel.create(subSectionPayload);
}

export const updateSubSection = async (courseSectionId : mongoose.Types.ObjectId , createCourseSubSectionId : mongoose.Types.ObjectId) => {
    return await courseSectionModel.findByIdAndUpdate(
        courseSectionId ,
        {
            $push : {subSection : createCourseSubSectionId},
            $inc : {totalLecture : 1}
        } ,
        {new : true}).exec();
}

export const findCourseByID = async(courseId :mongoose.Types.ObjectId) => {
    return await courseModel.findById(courseId);
}

// export const findSingleCourseByID = async(courseId : mongoose.Types.ObjectId) => {
//     return await(await courseModel.findById(courseId).populate('courseContent'))?.populate('subSection') , {new : true};
// }

// or by sir 
//  export const findSingleCourseByID = async(courseId : mongoose.Types.ObjectId) => {
//     return await courseModel.findById(courseId).populate({path : 'courseContent' , populate: {path : 'subSection'}}) , {new : true};
// }

export const findSingleCourseByID = async(courseId : mongoose.Types.ObjectId) => {
    return await courseModel.findById(courseId)
    .populate({
        path : 'instructor' , populate : {path: 'additional_info'}
    })
    .populate({
        path : 'courseContent' , populate : {path : 'subSection'}
    })
    .populate({
        path : 'category' , select : 'name'
    })
    . exec()
}

export const getDraftCourse = async() => {
    return await courseModel.findOne({status : 'Draft'})
    // .populate({
    //     path : 'instructor' , populate : {path: 'additional_info'}
    // })
    .populate({
        path : 'courseContent' , populate : {path : 'subSection'}
    })
    .populate({
        path : 'category' , select : 'name'
    })
    . exec()
}