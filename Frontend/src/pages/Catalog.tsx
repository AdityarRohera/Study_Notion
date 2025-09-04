// import React from 'react'
import AboutCourse from "../components/Category/AboutCourse"
import CourseContainer from "../components/Category/CourseContainer"
// import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getCategoryCourses } from "../Services/operations/categoryCourse";
// import { HomePageExplore } from "../Data/homePageExplore";
import { useParams } from "react-router-dom";


function Catalog() {

      const location = useLocation();
      const dispatch = useDispatch();
      const categoryId = location.state
      const query = new URLSearchParams(location.search);
      const desc = query.get("desc") || "";
       const params = useParams<{ catalogName: string }>(); // get name from URL
       console.log(params.catalogName)

      console.log("Category ID:", categoryId);
      console.log("Description:", desc);

    // fetch Data from home page explore;
    // const {heading , description} = HomePageExplore[2].courses[1];
    

    useEffect(() => {
        getCategoryCourses({dispatch , categoryId});
      } , [categoryId]);


  return (
    <div>
      <AboutCourse heading={params.catalogName}  desc= {desc}/>
      <CourseContainer/>

      {/* <Toaster/> */}
    </div>
  )
}

export default Catalog;
