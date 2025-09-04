// import { useState } from "react";
import CourseContentCard from "../../components/EnrolledCourses/CourseContentCard ";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchSingleCourse } from "../../Services/operations/instructorUtilis";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function EnrolledCourseSections() {

  const [courseContent , setCourseContent] = useState<any>(null);
  const navigate = useNavigate();
  const state = useParams();
  console.log(state.courseId);

  const image =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s"

  const fetchFullCourseHandler = async() => {
        const fullCourse = await fetchSingleCourse(state.courseId);
        // console.log(fullCourse);
        if(fullCourse){
            setCourseContent(fullCourse.courseContent);
        }
  }
  
  useEffect(() => {
    fetchFullCourseHandler()
  } , [])


  if(!courseContent){
    return toast("Loading...")
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">📚 Course Sections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {courseContent.map((course : any) => (
    <CourseContentCard
      key={course._id}
      title={course.sectionName}
      subtitle={`Total Lectures: ${course.totalLecture}`}
      image={image}
      onClick={() => navigate(`/dashboard/lectures/${course._id}`)}
    />
  ))}
</div>

    </div>
  );
}

export default EnrolledCourseSections;

