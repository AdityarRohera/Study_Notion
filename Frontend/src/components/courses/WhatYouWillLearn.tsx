// import React from 'react'

import Heading from "../commons/Heading"
import { useSelector } from "react-redux";
import type{ RootState } from "../../Services/strore";

function WhatYouWillLearn() {
  const { AboutCourse} = useSelector((state : RootState) => state.full_course);
  const {whatYouWillLearn} : any = AboutCourse;
  console.log(whatYouWillLearn)
  return (
    <div className="text-white border border-gray-500 flex flex-col justify-start items-start gap-5 mx-19 mt-10 p-10 w-[63%]">
  <Heading text="What you'll learn" size="md" />
  
  <div className="flex flex-col justify-start items-start gap-2 w-full">
    <p>{whatYouWillLearn}</p>
    <p>{whatYouWillLearn}</p>
    <p>{whatYouWillLearn}</p>
    <p>{whatYouWillLearn}</p>
    <p>{whatYouWillLearn}</p>
  </div>
</div>

  )
}

export default WhatYouWillLearn
