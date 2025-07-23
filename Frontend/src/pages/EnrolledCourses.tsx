// import React from 'react'

import MenuBar from "../components/commons/MenuBar";
import Heading from "../components/commons/Heading";
import Containner from "../components/EnrolledCourses/Containner";

function EnrolledCourses() {
  return (
    <div className="bg-gray-900 flex w-[100vw]">

        {/* Menu Bar */}
            <MenuBar/>

        {/* Enrolled Courses */}
        <div className=" border flex flex-col items-center px-[10vw] pt-[15vh]">
            <Heading text="Enrolled Courses" variant="primary" size="md"/>       
            <Containner/> 
        </div>

    </div>
  )
}

export default EnrolledCourses;
