import { useState } from "react"
import CourseSection from "./CourseSection"
import { formatDuration } from "../../Services/operations/common"

function CourseContent({ courseContent , duration }: any) {
  const [allCollapsed, setAllCollapsed] = useState(false)

  // Calculate totals
  const totalSections = courseContent.length
  const totalLectures = courseContent.reduce(
    (acc: number, sec: any) => acc + sec.sectionLecture.length,
    0
  )
  // For simplicity, fake total duration. Ideally sum durations here
  const totalDuration = formatDuration(duration);

  return (
    <div className="text-white flex flex-col gap-6 w-[63%] min-h-[300px] mt-20 mx-18">
      {/* Heading and totals */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Course content</h1>

        <div className="flex justify-between items-center text-gray-400 text-sm">
          <div className="flex gap-2">
            <span>{totalSections} sections</span>•
            <span>{totalLectures} lectures</span>•
            <span>{totalDuration} total length</span>
          </div>
          <button
            className="text-yellow-400 hover:underline"
            onClick={() => setAllCollapsed((prev) => !prev)}
          >
            {allCollapsed ? "Expand all sections" : "Collapse all sections"}
          </button>
        </div>
      </div>

      {/* Sections list */}
      <div className="border border-gray-700 rounded-lg overflow-hidden divide-y divide-gray-700">
        {courseContent.map((section: any) => (
          <CourseSection
            key={section._id}
            data={section}
            forceCollapse={allCollapsed}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseContent

