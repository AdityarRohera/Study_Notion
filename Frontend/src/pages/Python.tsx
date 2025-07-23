// import React from 'react'

import AboutCourse from "../components/Category/AboutCourse"
import { HomePageExplore } from "../Data/homePageExplore";
import CourseContainer from "../components/Category/CourseContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getCategoryCourses } from "../Services/operations/categoryCourse";
import { Toaster } from "react-hot-toast";

function Python({}) {

  const dispatch = useDispatch();

  const location = useLocation();
  const categoryId = location.state

    useEffect(() => {
      getCategoryCourses({dispatch , categoryId});
    } , []);


    const {heading , description} = HomePageExplore[2].courses[1];

  return (
    <div className="">
      <AboutCourse heading={heading}  desc= {description}/>
      <CourseContainer/>
      <Toaster/>
    </div>
  )
}

export default Python
