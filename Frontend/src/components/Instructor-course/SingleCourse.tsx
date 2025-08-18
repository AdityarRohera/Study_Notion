// import React from 'react'
// import { Link } from "react-router-dom"
import Heading from "../commons/Heading"

function SingleCourse() {
  return (
    <div className=" text-white bg-gray-900 flex items-center justify-center gap-5 relative">
      
     <div className="flex items-center gap-5">
         {/* course-Thumbnail div */}
        <div className="w-[250px] h-[150px] rounded-xl">
            <img className="w-full h-full rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOL5IjRU4P_EpCVcLApC1YDo_cxASRWErmJw&s" alt="img" />
        </div>

        {/* About Instructor Course */}
        <div className="w-[40%]">
            <Heading text={"Introduction to python"}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla sequi saepe dolor, aliquam atque natus sunt, adipisci doloremque qui nam voluptatum. Ipsa rem molestiae aut dolorem officiis explicabo beatae reiciendis.</p>
            
            <span>
                created:
            </span>

            
        </div>
     </div>


    {/* duration price actions */}
      <div className="flex gap-18 items-center absolute top-[40%] right-5">
        <span>{"20h 10m"}</span>
        <span>{"520"}</span>

            {/* icons and delete */}
        <div className="flex">
            ed
            de
        </div>

      </div>
       

    </div>
  )
}

export default SingleCourse
