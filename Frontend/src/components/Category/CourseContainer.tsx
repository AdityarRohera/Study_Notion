
import CoursesTemplete from "./CoursesTemplete"
 
function CourseContainer() {

  return (
    <div className="bg-black flex flex-col gap-20 py-20 px-25">

      {/* For category course */}
      <CoursesTemplete
        heading = "Courses to get you started"
        filterBar = {true}
        name = "CategoryCourses"
      />

      {/* Some More courses */} 
      <CoursesTemplete
        heading = "Some More courses"
        name = "SomeMoreCourses"
      />

    </div>
  )
}

export default CourseContainer
