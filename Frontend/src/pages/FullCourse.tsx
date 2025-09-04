// import React from 'react'

import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getFullCourse } from "../Services/operations/categoryCourse";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../Services/strore";

// import components here
import AboutFullCourse from "../components/courses/AboutFullCourse";
import WhatYouWillLearn from "../components/courses/WhatYouWillLearn";
// import CourseSection from "../components/courses/CourseSection";
import CourseContent from "../components/courses/CourseContent";
import AboutInstructor from "../components/courses/AboutInstructor";
import { fetchSingleCourse } from "../Services/operations/instructorUtilis";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function FullCourse() {

    const state= useParams();
    const [aboutCourse, setAboutCourse] = useState<any>(null);
    const [sections, setSections] = useState<any[]>([]);

    console.log("full course data -> " , aboutCourse , sections);

    const fetchCourseData = async () => {
    try {
      const fullCourse = await fetchSingleCourse(state.id);
      // console.log(fullCourse)
      if (fullCourse) {
        setAboutCourse(fullCourse.AboutCourse);

        // ✅ sections now contain subsections
        setSections(
          fullCourse.courseContent.map((sec: any) => ({
            _id: sec._id,
            sectionName: sec.sectionName,
            sectionLecture: sec.subSection || [], // subsections embedded
          }))
        );
      }
    } catch (err: any) {
      console.error("Error fetching course:", err.message);
      toast.error("Failed to fetch course");
    }
  };

  useEffect(() => {
      fetchCourseData();
  } , [])


  if(!aboutCourse){
        return(
          <>Loading...</>
        )
  }


  return (
    <div className="bg-black w-full min-h-[100vh] max-h-max pb-20">
      <AboutFullCourse AboutCourse={aboutCourse}/>
      <WhatYouWillLearn AboutCourse={aboutCourse}/>
      <CourseContent courseContent = {sections} duration={aboutCourse.totalLength}/>
      <AboutInstructor InstructorData={aboutCourse.instructor}/>
    </div>
  )
}

export default FullCourse
