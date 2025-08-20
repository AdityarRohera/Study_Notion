import MenuBar from "../../components/commons/MenuBar"
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete"
import { useLocation } from 'react-router-dom';

function CourseInfo() {

  const location = useLocation();
  const {state} = location;

  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">

         <MenuBar/>
        
         <NewCourseTemplete varient="courseInfo" state={state}/>

    </div>
  )
}

export default CourseInfo
