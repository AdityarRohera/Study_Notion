// import React from 'react'

// EnrolledCourseCard.jsx
// EnrolledCourseCard.jsx

import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({id , image , courseName } : any) {

    const navigate = useNavigate()

    const viewCourseHandler = () => {
        navigate(`/dashboard/enrolled-courses/${id}`)
    }

  return (
    <div className="w-[400px] bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
      {/* Banner Image */}
      <div className="relative">
        <img
          src={image}
          alt={courseName}
          className="w-full h-[200px] object-cover"
        />
        {/* Progress Circle (simple box for now) */}
        <div className="absolute top-3 right-3 bg-black/70 text-white rounded-full px-3 py-1 text-sm font-semibold">
          {0}%
        </div>
      </div>

      {/* Course Info */}
      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-white font-semibold text-xl">{courseName}</h3>

        {/* Only one button now */}
        <button onClick={viewCourseHandler} className="bg-white text-gray-900 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer">
          View Course
        </button>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;


