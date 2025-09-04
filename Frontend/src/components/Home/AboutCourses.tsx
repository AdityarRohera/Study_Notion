// import React from 'react'
// import Heading from "../commons/Heading"
// import AutoCodebarLayout from "./AutoCodebarLayout"
// import AutoCode from "./AutoCode"
import Info from "./Info"
import Code from "./Code"

function AboutCourses() {

    // const clickHandler = () => {console.log("clicked")}
  return (
    <div className="flex gap-5 rounded-xl bg-[#0d1117] text-white w-[85%] mx-auto p-6">
      <Info />
      <Code />
    </div>
  )
}

export default AboutCourses
