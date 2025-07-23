
import Heading from "../commons/Heading"
import CardContainer from "./CardContainer";

interface CourseTempleteType {
    heading : string;
    filterBar? : boolean;
    name : string;
}

function CoursesTemplete({heading , filterBar , name} : CourseTempleteType) {
  return (
    <div className=" text-white flex flex-col gap-10">

    {/* Top heading */}
      <div className="text-white flex flex-col gap-10">
        <Heading text={heading} variant="primary" size="lg"/>

      {/* filter div */}
      {
        filterBar &&
        <div className="flex flex-col gap-2">
         <div className="flex items-center gap-5">
             <span>Most Popular</span>
             <span>New</span>
             <span>Trending</span>
         </div>
      <hr className="text-white" />
      </div>
      }

      </div>


      {/* Cards Container */}
      <CardContainer name={name}/>
    </div>
  )
}

export default CoursesTemplete;
