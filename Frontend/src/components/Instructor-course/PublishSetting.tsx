// import React from 'react'

import { useState } from "react"
import Heading from "../commons/Heading"
import { useSelector} from "react-redux";
import { type RootState } from "../../Services/strore";
import toast, { Toaster } from "react-hot-toast";
import { publishDraftCourse } from "../../Services/operations/instructorUtilis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublishSetting() {

    const {AboutCourse ,courseContent , courseSection} = useSelector((state : RootState) => state.full_course);
    const {token} = useSelector((state: RootState) => state.auth);
    const [check , setCheck] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(check);

    const publishCourseHandler = async() => {
      console.log("Inside publish course func.");
      if(!check){
        toast.error('Check field for make course publish');
        return;
      }
       if(!AboutCourse && !courseContent && !courseSection){
          toast.error('Course Data is not field')
          return;
       }

       // now call api for publish course 
       await publishDraftCourse(dispatch , navigate , token!);

    }


  return (
    <div className=" border-1 border-gray-50 bg-gray-800 w-[45vw] h-[15vh] p-5 flex flex-col gap-5">
      <Heading text="Publish Settings"/>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="check-box" checked={check} className="border w-8 h-8" onChange={() => {setCheck(!check)}} />
        <label htmlFor="check-box">Make this course publish</label>
      </div>

      

      <div className="flex justify-end gap-4 mt-18 z-10 ml-50">
        <div>
        <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
          Save as Draft
        </button>
      </div>
      
      <div>
        <button onClick={publishCourseHandler} className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition">
          Save and Publish
        </button>
      </div>
      </div>

      <Toaster/>

    </div>
  )
}

export default PublishSetting
