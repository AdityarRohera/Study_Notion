// import React from 'react'

import { FaCheckCircle } from "react-icons/fa"
import Heading from "../commons/Heading"

function WhatYouWillLearn({ AboutCourse }: any) {
  const { whatYouWillLearn }: any = AboutCourse
  console.log(whatYouWillLearn)

  // In case it's a string (single text) or array
  const learnItems = Array.isArray(whatYouWillLearn)
    ? whatYouWillLearn
    : [whatYouWillLearn]

  return (
    <div className="bg-[#1f1f1f] text-white border border-gray-700 rounded-lg flex flex-col gap-6 mx-20 mt-10 p-10 w-[63%] shadow-lg">
      {/* Heading */}
      <Heading text="What you'll learn" size="md" />

      {/* Learning items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {learnItems.map((item: string, idx: number) => (
          <div key={idx} className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1 w-5 h-5 flex-shrink-0" />
            <p className="text-base text-gray-200 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatYouWillLearn

