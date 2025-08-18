// import React from 'react'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFullCourse } from "../Services/operations/categoryCourse";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Services/strore";

// import components here
import AboutFullCourse from "../components/courses/AboutFullCourse";
import WhatYouWillLearn from "../components/courses/WhatYouWillLearn";
// import CourseSection from "../components/courses/CourseSection";
import CourseContent from "../components/courses/CourseContent";
import AboutInstructor from "../components/courses/AboutInstructor";

function FullCourse() {

    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const {loading} = useSelector((state : RootState) => state.auth);

    const dispatch = useDispatch()
    const { AboutCourse, courseContent , courseSection } = useSelector((state: RootState) => state.full_course);

    // console.log("Course details" , AboutCourse);
    // console.log("course content" , courseContent);

    const showCourseHandler = () => {
            // card api of single course detail
            getFullCourse({dispatch , id})
        }

    useEffect(() => {
        showCourseHandler();
    } , [])


  if(loading || !AboutCourse || !courseContent || !courseSection){
        return(
          <>Loading...</>
        )
  }


  return (
    <div className="bg-gray-900 w-full min-h-[100vh] max-h-max pb-20">
      <AboutFullCourse/>
      <WhatYouWillLearn/>
      <CourseContent/>
      <AboutInstructor/>
      <div>cv</div>
    </div>
  )
}

export default FullCourse
