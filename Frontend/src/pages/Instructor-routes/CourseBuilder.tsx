import MenuBar from "../../components/commons/MenuBar"
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete"

function CourseBuilder() {
  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">

         <MenuBar/>

         {/* course-section div */}
         <div className="border">

         </div>
        
         <NewCourseTemplete varient="courseBuider"/>

    </div>
  )
}

export default CourseBuilder;