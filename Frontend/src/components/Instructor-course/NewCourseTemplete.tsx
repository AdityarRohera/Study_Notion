import StepTracker from "./StepTracker"
import CourseForm from "./CourseForm"
import CourseBuilderComponent from "./CourseBuilderComponent"
import CourseTips from "./CourseTips"
import { useNavigate } from "react-router-dom"


function NewCourseTemplete({varient , state} : {varient : string , state?:string}) {

    const navigate = useNavigate()

    const nextHandler = () => {
    if (varient === "courseInfo") {
      navigate("/dashboard/mycourse/course-builder");
    } else if (varient === "courseBuilder") {
      navigate("/dashboard/mycourse/additional-data");
    }
  };

  const prevHandler = () => {
    if (varient === "courseBuilder") {
      navigate("/dashboard/mycourse/course-info");
    } else if (varient === "publish") {
      navigate("/dashboard/mycourse/course-builder");
    }
  };


  return (
     <div className="min-h-screen w-[85vw] flex flex-col gap-8 px-10 pr-25 py-12 bg-black text-white border relative">

            {/* LEFT SIDE: Form and Steps */}
            {/* <div className="flex-1 flex flex-col gap-6 border w-[50vw]"> */}

              <StepTracker />

              {
                varient === 'courseInfo' && <CourseForm state={state!}/>  
              }
              {
                varient === 'courseBuilder' && <CourseBuilderComponent/>  
              }
              {
                varient === 'publish' && <div/>  
              }

              <div className="flex gap-5 justify-center mt-4">

                {
                    varient !== 'courseInfo' &&
                    <div className="flex mt-4">
                    <button onClick={prevHandler} className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
                       ◀ Prev
                    </button>
                    </div>
                }

                {
                    varient !== 'publish' &&
                    <div className="flex mt-4">
                    <button onClick={nextHandler} className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
                      Next ➤
                    </button>
                    </div>
                }

              </div>
              
            {/* </div> */}

            {/* RIGHT SIDE: Tips */}
            <div className="absolute right-[10%]">
              <CourseTips />
            </div>
            
        </div>
  )
}

export default NewCourseTemplete
