import mongoose from "mongoose";
import courseModel from "../models/courseModel";
import categoryModel from "../models/categoryModel";
import courseSectionModel from "../models/CourseSubSection";
import courseSubSectionModel from "../models/CourseSubSection";

interface CreateCourseType {
    courseName : string;
    courseDesc : string;
    whatYouWillLearn : string;
    price : number;
    thumbnail : string;
    category : mongoose.Types.ObjectId;
}

interface CreateSectionType {
    sectionName : string;
    totalLecture : number;
}

interface CreateSubSectionType {
    subSectionName : string;
    description : string;
    duration : number
}

export const findCategory = async(categoryId :mongoose.Types.ObjectId) => {
    return await categoryModel.findById(categoryId);
}

export const createCourse = async(createCoursePayload : CreateCourseType) => {
    const createCourse = await courseModel.create(createCoursePayload);
    return createCourse;
}

export const createSection = async(createSectionPayload : CreateSectionType) => {
    return await courseSectionModel.create(createSectionPayload);
}

export const updateCourseContent = async (courseId : mongoose.Types.ObjectId , sectionId : mongoose.Types.ObjectId) => {
    return await courseModel.findByIdAndUpdate(courseId , {$push : {courseContent : sectionId}} , {new : true});
}

export const createSubSection = async(subSectionPayload : CreateSubSectionType) => {
    return await courseSubSectionModel.create(subSectionPayload);
}

export const updateSubSection = async (courseSectionId : mongoose.Types.ObjectId , createCourseSubSectionId : mongoose.Types.ObjectId) => {
    return await courseSectionModel.findByIdAndUpdate(courseSectionId , {$push : {subSection : createCourseSubSectionId}} , {new : true});
}