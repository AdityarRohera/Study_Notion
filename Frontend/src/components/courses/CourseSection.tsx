import { useState, useEffect } from "react"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import CourseSubSection from "./CourseSubSection"

function CourseSection({ data, forceCollapse }: any) {
  const { sectionName, sectionLecture } = data
  const [isVisible, setIsVisible] = useState(false)

  // Handle Collapse / Expand all
  useEffect(() => {
    if (forceCollapse) setIsVisible(false)
    else setIsVisible(true)
  }, [forceCollapse])

  return (
    <div className="bg-[#1f1f1f] border border-gray-700 rounded-md overflow-hidden">
      {/* Section header */}
      <div
        className="w-full flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-700/70 transition-colors"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          {isVisible ? (
            <IoIosArrowDown className="w-6 h-6 text-yellow-400" />
          ) : (
            <IoIosArrowForward className="w-6 h-6 text-yellow-400" />
          )}
          <h2 className="text-lg font-semibold text-gray-200">{sectionName}</h2>
        </div>

        <div className="flex gap-4 items-center text-base text-gray-400">
          <span>{sectionLecture.length} lectures</span>
          <span>51 min</span>
        </div>
      </div>

      {/* Subsections */}
      <div
        className={`transition-all duration-300 ${
          isVisible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {sectionLecture.map((subSection: any) => (
          <CourseSubSection
            key={subSection._id}
            subSectionData={subSection}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseSection

































// import { useState } from "react";
// import { FaChevronDown, FaChevronUp, FaDesktop } from "react-icons/fa";

// export default function CourseSection() {
//   const [openSections, setOpenSections] = useState<number[]>([]);

//   const sections = [
//     {
//       title: "Introduction & Basics",
//       totalTime: "51min",
//       lectures: [
//         {
//           title: "Why Python",
//           description:
//             "Python is one of the fastest-growing programming languages. Let me tell you, learning python is easy.",
//           time: "02:09",
//           instructor: "/instructor.png",
//         },
//         {
//           title: "How to install Python and Sublime text",
//           time: "02:09",
//         },
//         {
//           title: "Variable Declaration and Memory Allocation",
//           time: "02:09",
//         },
//         {
//           title: "Builtin Python Datatypes",
//           time: "02:09",
//         },
//         {
//           title: "Python Operators",
//           time: "02:09",
//         },
//       ],
//     },
//     {
//       title: "Conditional Statements and Loops",
//       totalTime: "40min",
//       lectures: [
//         { title: "If, Else and Elif", time: "08:00" },
//         { title: "While Loop", time: "07:30" },
//         { title: "For Loop", time: "07:30" },
//         { title: "Break and Continue", time: "09:00" },
//         { title: "Loop Examples", time: "08:00" },
//       ],
//     },
//     {
//       title: "Python Functions",
//       totalTime: "45min",
//       lectures: [
//         { title: "Function Basics", time: "05:00" },
//         { title: "Function Arguments", time: "08:00" },
//         { title: "Return Keyword", time: "09:00" },
//         { title: "Lambda Functions", time: "07:00" },
//         { title: "Scope in Python", time: "08:00" },
//       ],
//     },
//   ];

//   const toggleSection = (index: number) => {
//     setOpenSections(prev =>
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <div className="text-white bg-[#111827] w-[60%] mx-20 my-8">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Course content</h2>
//         <p className="text-yellow-400 cursor-pointer">Collapse all sections</p>
//       </div>
//       <p className="text-sm opacity-70 mb-4">
//         {sections.length} sections •{" "}
//         {sections.reduce((acc, cur) => acc + cur.lectures.length, 0)} lectures •
//         7h 57m total length
//       </p>

//       {sections.map((section, index) => (
//         <div key={index} className="bg-gray-800 mb-2 rounded overflow-hidden">
//           <div
//             className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-700"
//             onClick={() => toggleSection(index)}
//           >
//             <h3 className="text-md font-medium">{section.title}</h3>
//             <div className="flex gap-4 items-center">
//               <span className="text-yellow-400 text-sm">
//                 {section.lectures.length} lectures
//               </span>
//               <span className="text-sm">{section.totalTime}</span>
//               {openSections.includes(index) ? (
//                 <FaChevronUp />
//               ) : (
//                 <FaChevronDown />
//               )}
//             </div>
//           </div>

//           {openSections.includes(index) && (
//             <div className="bg-[#1f2937] px-4 py-2">
//               {section.lectures.map((lecture, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-start py-3 border-b border-gray-600"
//                 >
//                   <div className="flex gap-3 items-start">
//                     <FaDesktop className="text-gray-400 mt-1" />
//                     <div>
//                       <p className="font-medium text-sm">{lecture.title}</p>
//                       {lecture.description && (
//                         <p className="text-sm opacity-60 mt-1">
//                           {lecture.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end gap-1">
//                     {lecture.instructor && (
//                       <div className="w-6 h-6 rounded-full overflow-hidden">
//                         <img
//                           src={lecture.instructor}
//                           alt="instructor"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     )}
//                     <span className="text-sm">{lecture.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

