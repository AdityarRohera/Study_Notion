// import React from 'react'

function LectureEditing({close} : any) {
  return (
     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/60">
      <div className="bg-[#111827] text-white rounded-lg w-[600px] p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editing Lecture</h2>
          <button onClick={() => close()}  className="text-white text-2xl font-bold border">
            &times;
          </button>
        </div>

        {/* Upload Video Box */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Video <span className="text-red-500">*</span>
          </label>
          <div className="border-dashed border-2 border-gray-500 rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer">
            <div className="text-4xl mb-4">⬆️</div>
            <p className="text-gray-400">
              Drag and drop an image, or{" "}
              <span className="text-yellow-300 cursor-pointer">Browse</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Max 6MB each (12MB for videos)
            </p>
            <div className="flex gap-4 text-gray-500 text-xs mt-2">
              <span>• Aspect ratio 16:9</span>
              <span>• Recommended size 1024×576</span>
            </div>
          </div>
        </div>

        {/* Lecture Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Lecture Title"
            className="w-full p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none"
          />
        </div>

        {/* Video Playback Time */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Video Playback Time <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <select className="w-1/3 p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none">
              <option>HH</option>
            </select>
            <select className="w-1/3 p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none">
              <option>MM</option>
            </select>
            <select className="w-1/3 p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none">
              <option>SS</option>
            </select>
          </div>
        </div>

        {/* Lecture Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Description"
            className="w-full p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none"
            defaultValue="This course examines the evolution of design from ancient times to the present day, including movements and styles."
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            // onClick={onClose}
            className="bg-[#374151] text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold">
            Save Edits
          </button>
        </div>
      </div>
    </div>
  )
}

export default LectureEditing
