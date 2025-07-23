// import React from 'react'

import BuyCourseCard from "./BuyCourseCard"

function AboutFullCourse() {
  return (
   <div className="relative bg-gray-700 text-white flex px-20 py-10 w-full min-h-[40vh]">
  {/* Left Section */}
  <div className="flex flex-col w-[69%] space-y-6 border-r-1 border-gray-500 ">
    
    {/* Breadcrumb */}
    <div className="text-base flex items-center gap-1">
      <span className="opacity-60">Home</span> /
      <span className="opacity-60">Learning</span> /
      <span className="text-yellow-400 font-semibold">Python</span>
    </div>

    {/* Course Title and Description */}
    <div>
      <h1 className="text-3xl font-bold leading-tight break-words whitespace-normal">
        The Complete Python Bootcamp From Zero to Hero in Python
      </h1>
      <p className="text-gray-300 mt-2 text-lg max-w-[90%]">
        This Python for beginners course will help you to become Zero to Hero. Learn Python Programming in Easy Way.
      </p>
    </div>

    {/* Ratings and Students */}
    <div className="flex items-center gap-3 text-lg">
      <span className="text-yellow-400 font-bold">4.5</span>
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
        <svg className="w-5 h-5 text-yellow-400 stroke-current fill-none" viewBox="0 0 20 20" strokeWidth="1">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
      </div>
      <span className="text-gray-300">(650 ratings)</span>
      <span className="text-gray-300">• 332,402 students</span>
    </div>

    {/* Instructor and Meta Info */}
    <div className="text-lg text-gray-300">
      <p className="mb-1">Created by <span className="text-white font-semibold">Instructor Name</span></p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>🕒</span>
          <p>Created at 02/2020</p>
        </div>
        <div className="flex items-center gap-2">
          <span>🌐</span>
          <p>English</p>
        </div>
      </div>
    </div>
  </div>

        <BuyCourseCard/>
</div>
  )
}

export default AboutFullCourse
