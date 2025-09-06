// import React from 'react'

import MenuBar from "../components/commons/MenuBar";
import Heading from "../components/commons/Heading";
import EnrolledCoursesContainer from "../components/EnrolledCourses/EnrolledCoursesContainer";
import { getEnrolledCourses } from "../Services/operations/purchasedCoursesUtilis";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import Loading from "../components/commons/Loading";


function EnrolledCourses() {

  const [enrolledCourses , setEnrolledCourses] = useState<any>(null);
  console.log(enrolledCourses);

  // fatch user puchased courses
  const dispatch = useDispatch();

  const fetchCourses = async() => {
      const res = await getEnrolledCourses(dispatch);
      // console.log(res);
      if(res){
          setEnrolledCourses(res.enrolledCourses)
      }
  }

  useEffect(() => {
      fetchCourses();
  } , [])

  if(!enrolledCourses){
      return(<Loading/>)
  }

  return (
    <div className="bg-gray-900 flex w-[100vw]">

        {/* Menu Bar */}
            <MenuBar/>

         <div className="flex flex-col gap-10 px-[4vw] pt-[10vh] w-[85%]">
          {/* Greeting user */}
          <div className="text-4xl font-bold text-white">
            <Heading text="Good Morning Aditya Rohera"/>
          </div>

        {/* Enrolled Courses */}
        <div className="flex flex-col gap-10 justify-center items-center w-full">
          {/* Heading */}
          <Heading
            text="Enrolled Courses"
            variant="primary"
            size="md"
          />

          {/* Courses Container */}
          <EnrolledCoursesContainer  enrolledCourses={enrolledCourses} />
        </div>
         </div>


    </div>
  )
}

export default EnrolledCourses;
