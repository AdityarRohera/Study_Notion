import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import AboutCourse from "../components/Category/AboutCourse";
import CourseContainer from "../components/Category/CourseContainer";
import { HomePageExplore } from "../Data/homePageExplore";
import { getCategoryCourses } from "../Services/operations/categoryCourse";

function Python() {
  const dispatch = useDispatch();

  const location = useLocation();
  const categoryId = location.state;

  useEffect(() => {
    getCategoryCourses({ dispatch, categoryId });
  }, []);

  const { heading, description } = HomePageExplore[2].courses[1];

  return (
    <div className="bg-ink-950">
      <AboutCourse heading={heading} desc={description} />
      <CourseContainer />
    </div>
  );
}

export default Python;
