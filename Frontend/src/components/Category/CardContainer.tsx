// import React from 'react'
import CourseCard from "./CourseCard"
import { useSelector} from "react-redux";
import type { RootState } from "../../Services/strore";
// import { useEffect } from "react";
import Loading from "../commons/Loading";

function CardContainer({name} : {name : string}) {

     const {categoryCourses ,someMoreCourses , topSellingCourses , isLoading} = useSelector((state :RootState ) => state.category_courses)
     

     if (isLoading) {
       return <Loading/>;
     }

     if (!categoryCourses || categoryCourses.length === 0) {
        return <div className="text-white">No Courses Found</div>;
     }

  return (
    <div className="flex items-center gap-10 overflow-x-scroll overflow-y-hidden scrollbar-hidden overflow-scroll min-h-[400px] pl-2">
      {/* <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/>
      <CourseCard/> */}

      {
        // now map courses cards
        name === "CategoryCourses" && 
        categoryCourses?.map((category , index) => {
            return <CourseCard key={index} data={category}/>
        })
      }

      {
        name === "SomeMoreCourses" && 
        someMoreCourses?.map((courses ,index) => {
            return <CourseCard key={index} data={courses}/>
        })
      }

      {
        name === "TopSellingCourses" && 
        topSellingCourses?.map((courses ,index) => {
            return <CourseCard key={index} data={courses}/>
        })
      }

    </div>
  )
}

export default CardContainer
