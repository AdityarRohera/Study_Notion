// import React from 'react'

function SectionAndSubsectionHeading() {
  return (
    <div className=" flex flex-col gap-2">
        <div className="flex justify-between">
        
        <div className="flex gap-2">
          📁
          <span>{"Lecture-1"}</span>
        </div>

        <div className="flex gap-4">
          ✏️ {/* Edit Icon */}
          🗑️ {/* Delete Icon */}

            <div>
                icon
            </div>
        </div>

      </div>

      <hr className="text-gray-500 w-full" />
    </div>
  )
}

export default SectionAndSubsectionHeading
