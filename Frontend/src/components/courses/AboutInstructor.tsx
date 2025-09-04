
import { FaUserCircle } from "react-icons/fa"

function AboutInstructor({ InstructorData }: any) {
  const { firstName, lastName, additional_info, profileImage } = InstructorData

  return (
    <div className="bg-[#1f1f1f] text-white border border-gray-700 rounded-lg shadow-lg flex flex-col gap-6 w-[63%] mx-20 mt-10 p-8">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-100">About the Instructor</h1>

      {/* Instructor info */}
      <div className="flex items-center gap-4">
        {/* Profile picture or fallback icon */}
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${firstName} ${lastName}`}
            className="w-16 h-16 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <FaUserCircle className="w-16 h-16 text-gray-500" />
        )}

        <div className="flex flex-col">
          <span className="text-lg font-medium">{`${firstName} ${lastName}`}</span>
          <span className="text-sm text-gray-400">Instructor</span>
        </div>
      </div>

      {/* About text */}
      <p className="text-gray-300 leading-relaxed text-base">
        {additional_info?.about || "No information provided."}
      </p>
    </div>
  )
}

export default AboutInstructor
