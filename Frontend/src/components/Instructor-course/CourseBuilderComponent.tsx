// import Heading from "../commons/Heading"
// import InputField from "../commons/InputField"


//  function CourseSection() {
//      {/* Course-section-div */}
//        return(
//          <div className=" flex flex-col">
//             {/* section part */}
//             <div className="flex flex-col gap-2 border-2 p-1 border-yellow-300">
            
//                 <div className="flex justify-between">
//                  <div className="flex gap-2">
//                   icon
//                   <span>{"Lession-1"}</span>
//                  </div>

//                  <div className="flex gap-2">
//                   ed
//                   dl
//                  </div>
//                 </div>

//                 <hr className="text-white bg-gray-200 w-full" />
//             </div>

//             {/* Button div */}
//             <button className=" text-yellow-300 border-1 rounded-xl p-1 w-[100px]">
//                 Add Lecture
//             </button>
//          </div>
//        )
// }


// function CourseBuilderComponent() {
    
//     const CreateSectionHandler = () => {
        
//     }


//   return (
//     <div className="border flex flex-col gap-5 w-[45vw] p-5">
//       <Heading text="Course Builder"/>

//     {/* course lecture dynamic div */}
//       <div className="border bg-gray-700 text-white flex flex-col gap-5 p-2 visible">

//         <CourseSection/>
//          <CourseSection/>
//           <CourseSection/>

//       </div>


//     {/* Create section div */}
//       <div className="flex flex-col gap-5 justify-center">
//         <InputField type="text" size="xl" placeholder="Add a section to build your course"/>

//         <button onClick={CreateSectionHandler} className="text-2xl text-yellow-300 border-1 rounded-xl p-2 w-[200px]">
//             + Create Section
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CourseBuilderComponent;




// start



// CourseBuilderComponent.jsx

import { useState } from "react";
import Heading from "../commons/Heading";
import InputField from "../commons/InputField";
import CourseBuilderSection from "./CourseBuilderSection";
// import CourseSection from "./CourseSection";


function CourseBuilderComponent() {
  // 👇 Your state to hold all sections
  const [sections, setSections] = useState<any>([]);
  const [newSectionName, setNewSectionName] = useState<any>("");

  const CreateSectionHandler = () => {

    const newSection = {
      id: Date.now(),   // or from backend
      name: newSectionName,
      lectures: [],     // initially empty
    };
    setSections([...sections, newSection]);
    setNewSectionName("");    // clear input
  };

  return (
    <div className="border flex flex-col gap-5 w-[45vw] p-5">
      <Heading text="Course Builder" />

      {/* ✅ Render only if sections exist */}
      {sections.length > 0 && (
        <div className="border bg-gray-700 text-white flex flex-col gap-5 p-2">
          {sections.map((section : any) => (
            <CourseBuilderSection
              key={section.id}
              section={section}
              setSections={setSections}
              sections={sections}
            />
          ))}
        </div>
      )}


      {/* ✅ Create section input */}
      <div className="flex flex-col gap-5 justify-center">
        <InputField
          type="text"
          size="xl"
          placeholder="Add a section to build your course"
          value={newSectionName}
          changeHandler={(e) => setNewSectionName(e.target.value)}
        />

        <button
          onClick={CreateSectionHandler}
          className="text-2xl text-yellow-300 border rounded-xl p-2 w-[200px]"
        >
          + Create Section
        </button>
      </div>
    </div>
  );
}

export default CourseBuilderComponent;