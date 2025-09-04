
import CoursesTemplete from "./CoursesTemplete"
import { useSelector} from "react-redux";
import type { RootState } from "../../Services/strore";
 
function CourseContainer() {

  const {categoryCourses ,someMoreCourses} = useSelector((state :RootState ) => state.category_courses)

  return (

    <div className="bg-black flex flex-col gap-20 py-20 px-25">

      {/* For category course */}
      {
        categoryCourses && categoryCourses.length !== 0 &&
        <CoursesTemplete
        heading = "Courses to get you started"
        filterBar = {true}
        name = "CategoryCourses"
      />
      }

      {/* Some More courses */} 
      {
        someMoreCourses && someMoreCourses.length !== 0 &&
        <CoursesTemplete
        heading = "Some More courses"
        name = "SomeMoreCourses"
        />
      }

    </div>
  )
}

export default CourseContainer
