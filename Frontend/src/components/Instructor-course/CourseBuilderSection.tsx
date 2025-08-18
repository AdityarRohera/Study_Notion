// CourseSection.jsx

// import { useState } from "react";
// import InputField from "../commons/InputField";
import LectureEditing from "./LectureEditing";

import { useRef, useState } from "react";
import SectionAndSubsectionHeading from "./SectionAndSubsectionHeading";

function CourseBuilderSection() {

    const[subSection , setSubSection] = useState<any>([]);
    const editLecture = useRef<any>(null)

    // const addSubSectionHandler = async() => {
    //     console.log("Inside add sub-section handler")
    //     // call api
    // }

    // Edit lecture open and close handler functions
    const OpenEditLectureHandler = () => {
        editLecture.current.classList.remove('hidden');
    }

    const closeEditLectureHandler = () => {
        editLecture.current.classList.add('hidden');
    }

//   const [lectureName, setLectureName] = useState("");

//   const addLectureHandler = () => {
//     if (!lectureName) return;
//   }


  return (
    <div className="flex flex-col gap-2 p-5 relative">

      {/* ✅ Section Header */}
      <SectionAndSubsectionHeading/>

      {/* Drop Down for sub-sections */}
      <div className=" flex flex-col gap-8 justify-center pl-5 mt-5">
        <SectionAndSubsectionHeading/>
        <SectionAndSubsectionHeading/>
        <SectionAndSubsectionHeading/>
      </div>
      
      <div>
        <button onClick={OpenEditLectureHandler} className="text-yellow-300 border rounded-xl p-1 w-[100px] mt-2">
          + Add Lecture
        </button>
      </div>


      <div ref={editLecture} className="border absolute hidden">
        <LectureEditing close = {closeEditLectureHandler}/>
      </div>

    </div>
  );
}

export default CourseBuilderSection;





//  {/* ✅ List Lectures */}
//
// {
//         section.lectures.map((lecture : any) => (
//             <div key={lecture.id} className="pl-4 flex justify-between">
//               <div className="flex gap-2">
//                 🎥
//                 <span>{lecture.name}</span>
//               </div>
//               <div className="flex gap-2">
//                 ✏️ {/* Edit Lecture */}
//                 🗑️ {/* Delete Lecture */}
//               </div>
//             </div>
//         ))
// }


// {/* ✅ Add Lecture Button */}
//         {/* {
//         <div className="flex gap-2 mt-2">
//           <InputField
//             type="text"
//             size="xl"
//             value={lectureName}
//             changeHandler={(e) => setLectureName(e.target.value)}
//             placeholder="Lecture Name"
//           />
//         </div>
//       } */}
