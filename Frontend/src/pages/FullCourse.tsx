// import React from 'react'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFullCourse } from "../Services/operations/categoryCourse";
import { useLocation } from "react-router-dom";

// import components here
import AboutFullCourse from "../components/courses/AboutFullCourse";
import WhatYouWillLearn from "../components/courses/WhatYouWillLearn";
// import CourseSection from "../components/courses/CourseSection";
import CourseContent from "../components/courses/CourseContent";
import AboutInstructor from "../components/courses/AboutInstructor";

function FullCourse() {

    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch()

    const showCourseHandler = () => {
            console.log("hello")
    
            // card api of single course detail
            getFullCourse({dispatch , _id : id})
        }

    useEffect(() => {
        showCourseHandler();
    } , [])


  return (
    <div className="bg-gray-900 w-full min-h-[100vh] max-h-max pb-20">
      <AboutFullCourse/>
      <WhatYouWillLearn/>
      <CourseContent/>
      <AboutInstructor/>
    </div>
  )
}

export default FullCourse
