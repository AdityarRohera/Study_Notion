// import React from 'react'
import MenuBar from "../../components/commons/MenuBar"
// import Heading from "../../components/commons/Heading"
import SingleCourse from "../../components/Instructor-course/SingleCourse"
// import { useNavigate } from "react-router-dom"
import { getSingleCourse } from "../../Services/operations/instructorUtilis"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {type  RootState } from "../../Services/strore"
import { useNavigate } from "react-router-dom"
import CoursePopup from "../../components/Instructor-course/CoursePopup"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { getInstructorCourses } from "../../Services/operations/instructorUtilis"
import { Toaster } from "react-hot-toast"

function MyCourse() {

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [instructorCourses , setInstructorCourses] = useState<any>([]);

    // console.log(instructorCourses)
    
    const path: any = location.pathname?.split('/');

    const popUpRef = useRef<any>(null);
    const {token} = useSelector((state : RootState) => state.auth);

    if(!token){
      navigate('/login');
      return;
    }


    const openPopUp = () => {
        popUpRef.current.classList.remove('hidden');
    }

    const closePopUp = () => {
        popUpRef.current.classList.add('hidden');
    }

    const newCourseHandler = async() => {
        const course = await getSingleCourse(dispatch);
        if(!course) navigate(`/dashboard/mycourse/course-info/new-course`);
        else openPopUp();
    }

    const getCourses = async() => {
      const data = await getInstructorCourses(dispatch , token);
      setInstructorCourses(data);
    }

  useEffect(() => {
      getCourses();
  } , [])


  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">
        
      <MenuBar/>

      {/* my-course div */}
      <div className="flex flex-col gap-8 p-10 w-[85%] text-white">

  {/* Breadcrumbs */}
  <div className="text-xl">
    <span className="opacity-60">HOME</span>
    {path.map((p: any, index: number) => {
      if (index === path.length - 1)
        return (
          <span key={index} className="text-yellow-400 opacity-100">
            {" "}
            / {p.toUpperCase()}
          </span>
        );
      if (p !== "") {
        return (
          <span key={index} className="opacity-60">
            {" "}
            / {p.toUpperCase()}
          </span>
        );
      }
    })}
  </div>

  {/* Page Heading */}
  <h1 className="text-3xl font-bold">My Course</h1>

  {/* Instructor Courses Container */}
  {/* Instructor Courses Container */}
<div className="bg-[#0f172a] rounded-xl border border-gray-700 flex flex-col gap-6 px-6 py-6 shadow-md">

  {/* Header */}
  <div className="grid grid-cols-[1fr_150px_120px_140px] items-center text-gray-300 font-semibold text-sm px-4">
    <div>COURSES</div>
    <div className="text-center">DURATION</div>
    <div className="text-center">PRICE</div>
    <div className="text-center">ACTIONS</div>
  </div>
  <hr className="border-gray-700" />

  {/* Instructor courses cards */}
  <div className="flex flex-col gap-6">
    {instructorCourses.map((course: any) => (
      <SingleCourse key={course._id} data={course} />
    ))}
  </div>
</div>

</div>


      <button onClick={newCourseHandler} className="absolute top-[6%] right-[10%]  border text-2xl text-black bg-amber-300 p-2 rounded-2xl cursor-pointer">
        + New
      </button>

        <div ref={popUpRef} className="border absolute hidden">
          <CoursePopup close={closePopUp}/>
        </div>

        <Toaster/>
    </div>
  )
}

export default MyCourse;