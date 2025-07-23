// import React from 'react'
import AboutCourse from "../components/Category/AboutCourse"
import CourseContainer from "../components/Category/CourseContainer"
// import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getCategoryCourses } from "../Services/operations/categoryCourse";
import { HomePageExplore } from "../Data/homePageExplore";


function Catalog() {

      const location = useLocation();
      const dispatch = useDispatch();
      const categoryId = location.state
      console.log("This is inside all courses container " , categoryId);

    // fetch Data from home page explore;
    const {heading , description} = HomePageExplore[2].courses[1];
    

    useEffect(() => {
        getCategoryCourses({dispatch , categoryId});
      } , [categoryId]);


  return (
    <div>
      <AboutCourse heading={heading}  desc= {description}/>
      <CourseContainer/>

      {/* <Toaster/> */}
    </div>
  )
}

export default Catalog;
