// import React from 'react'

// import components here
import BecomeInstructor from "../BecomeInstructor"
import Video from "../Video"
import AboutCourses from "../AboutCourses"
import StartCoding from "../StartCoding"
function Section1() {
  return (
    <div className="bg-gray-900 text-white flex flex-col gap-10 items-center pt-15 px-10 min-h-[100vh]">
      <BecomeInstructor/>
      <Video/>
      <AboutCourses/>
      <StartCoding/>
    </div>
  )
}

export default Section1
