// import React from 'react'
import MenuBar from "../../components/commons/MenuBar"
import Heading from "../../components/commons/Heading"
import SingleCourse from "../../components/Instructor-course/SingleCourse"
// import { useNavigate } from "react-router-dom"
import { getSingleCourse } from "../../Services/operations/instructorUtilis"
import { useDispatch } from "react-redux"
// import { useSelector } from "react-redux"
// import {type  RootState } from "../../Services/strore"
import { useNavigate } from "react-router-dom"
import CoursePopup from "../../components/Instructor-course/CoursePopup"
import { useRef } from "react"

function MyCourse() {

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popUpRef = useRef<any>(null);
    // const {AboutCourse} = useSelector((state : RootState) => state.full_course);


    const openPopUp = () => {
        popUpRef.current.classList.remove('hidden');
    }

    const closePopUp = () => {
        popUpRef.current.classList.add('hidden');
    }

    const newCourseHandler = async() => {
        
        const course = await getSingleCourse(dispatch);
        if(!course) navigate('/dashboard/mycourse/course-info' , {state : 'new-course'});
        else openPopUp();
    }


  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">
        
      <MenuBar/>

      {/* my-course div */}
      <div className="flex flex-col gap-5 p-10 border w-[85%]">  
          <div className="text-xl text-white">
               <span className="opacity-60">Home / catalog / </span> 
               <span className="text-yellow-300">{"heading"}</span>
          </div>

          {/* heading */}
          <Heading text="My Course"/>

        {/* Instructor Courses Container */}
        <div className="border-1 border-gray-500 flex flex-col gap-5 px-5 py-5">

            {/* Header */}
            <div className="flex justify-between  items-center">
                <div>COURSES</div>
                <div className="flex items-center gap-15">
                    <span>DURATION</span>
                    <span>PRICE</span>
                    <span>ACTIONS</span>
                </div>
            </div>
            
            <hr className="text-white bg-gray-200 w-full" />
            
            {/* Instructor courses cards */}
            <div className="flex flex-col gap-15">
                <SingleCourse/>
                <SingleCourse/>
                <SingleCourse/>
                <SingleCourse/>
            </div>

        </div>

      </div>

      <button onClick={newCourseHandler} className="absolute top-[6%] right-[10%]  border text-2xl text-black bg-amber-300 p-2 rounded-2xl cursor-pointer">
        + New
      </button>

        <div ref={popUpRef} className="border absolute hidden">
          <CoursePopup close={closePopUp}/>
        </div>
    </div>
  )
}

export default MyCourse;