import { useState } from "react"

function CourseSubSection() {

    const [isVisible , setIsVisible] = useState(false)
  return (
    <div className=" border-yellow-300 bg-gray-900 flex flex-col gap-1 justify-center items-center w-full min-h-[50px]">

       {/* Always display content */}
      <div className="flex justify-between items-center w-full min-h-[50px] px-5">
          <div className="flex gap-2">
            icon
            course-sub-section
            <button className="cursor-pointer" onClick={() => setIsVisible((prev) => !prev)}>
                  icon
            </button>
         </div>


        {/* lectur time*/}
         <div>
            <span>5 min</span>
         </div>
      </div>

      {/* Hide content */}
      <div className={`w-full  ${isVisible ? 'block' : 'hidden'} px-5`}>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium molestiae quod quae asperiores minus maiores veritatis</h1>
      </div>
    </div>
  )
}

export default CourseSubSection
