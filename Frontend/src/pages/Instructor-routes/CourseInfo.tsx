import MenuBar from "../../components/commons/MenuBar"
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete"

function CourseInfo() {
  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">

         <MenuBar/>
        
         <NewCourseTemplete varient="first"/>

    </div>
  )
}

export default CourseInfo
