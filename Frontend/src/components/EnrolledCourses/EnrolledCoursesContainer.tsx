// import React from 'react'

// import { Link } from "react-router-dom";
import EnrolledCourseCard from "./EnrolledCourseCard"

function EnrolledCoursesContainer({enrolledCourses} : any) {
    console.log(enrolledCourses)

  // temporary mock data
//   const courses = [
//     {
//       id: 1,
//       title: "Ad hoc classes",
//       progress: 0,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//     {
//       id: 2,
//       title: "DSA Classes",
//       progress: 0,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//     {
//       id: 3,
//       title: "Cohort 3.0 | Web Dev",
//       progress: 52,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//     {
//       id: 4,
//       title: "Cohort 3.0 | DevOps",
//       progress: 0,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//     {
//       id: 5,
//       title: "Cohort 3.0 | Web3",
//       progress: 9,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//     {
//       id: 6,
//       title: "Solana Fellowship",
//       progress: 0,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s",
//     },
//   ];


  return (
    <div className="w-full bg-gray-800 flex flex-wrap items-center gap-6 p-5 rounded-2xl">
      {enrolledCourses.map((course : any) => {
        const {_id ,  courseName ,  thumbnail} = course.courseId;
        return(
             <EnrolledCourseCard key={_id} id={_id} image={thumbnail} courseName={courseName} />
        )
      })}
    </div>
  );
}

export default EnrolledCoursesContainer;
