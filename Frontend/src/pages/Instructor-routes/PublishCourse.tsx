

import MenuBar from "../../components/commons/MenuBar"
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete"
import { useParams } from "react-router-dom";

function PublishCourse() {
  
  const { state } = useParams(); // "draft-course" or "new-course"
  console.log(state);

  return (
    <div className="bg-gray-900 text-white flex w-[100vw] relative">

         <MenuBar/>
        
         <NewCourseTemplete varient="publish" state={state}/>

    </div>
  )
}

export default PublishCourse;