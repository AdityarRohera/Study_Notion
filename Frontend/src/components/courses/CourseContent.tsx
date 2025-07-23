// import React from 'react'

import CourseSection from "./CourseSection"

function CourseContent() {
  return (
    <div className="text-white flex flex-col gap-3 w-[63%] min-h-[300px] mt-20 mx-18">

        {/* Heading and Total lectures div */}
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-medium">Course Content</h1>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <span>10 lectures</span> .
                    <span> 41 lectures</span> .
                    <span>7h 57m total length</span>
                </div>
                <div>
                    collapse all sections
                </div>
            </div>

        </div>

        {/* course content div */}
        <div className="border-1 border-gray-200 flex flex-col items-center w-full min-h-[195px]">

            <CourseSection/>
            <CourseSection/>
            <CourseSection/>

        </div>
    </div>
  )
}

export default CourseContent
