import { useState } from "react"
import { MdPlayCircleOutline } from "react-icons/md"
import { formatDuration } from "../../Services/operations/common"

function CourseSubSection({ subSectionData }: any) {
  const { subSectionName, description, duration } = subSectionData
  const [isVisible, setIsVisible] = useState(false)

  const time = formatDuration(duration);


  return (
    <div className="bg-[#121212] border-t border-gray-700">
      {/* Row */}
      <div
        className="flex justify-between items-center w-full px-12 py-4 hover:bg-gray-800/70 cursor-pointer transition-colors"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <MdPlayCircleOutline className="w-6 h-6 text-gray-300" />
          <span className="text-base font-medium text-gray-200">
            {subSectionName}
          </span>
        </div>
        <span className="text-md text-gray-400">{time}</span>
      </div>

      {/* Description */}
      <div
        className={`px-16 pb-4 text-sm text-gray-400 leading-relaxed transition-all duration-300 ${
          isVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {description}
      </div>
    </div>
  )
}

export default CourseSubSection



