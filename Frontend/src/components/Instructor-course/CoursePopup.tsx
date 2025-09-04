// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteDraftCourse } from "../../Services/operations/instructorUtilis";

export default function CoursePopup({close} : any) {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

  const handleContinue = () => {
    console.log("✅ Continue Draft clicked");
    navigate(`/dashboard/mycourse/course-info/draft-course`);
  };

  const handleStartNew = async() => {
    console.log("🆕 Start New clicked");
        // first call delete api and then navigate to new page
        await deleteDraftCourse(dispatch);
        navigate('/dashboard/mycourse/course-info/new-course');
  };

return (
  <div className="flex justify-center items-center bg-gray-900 text-white">

    {/* Background Overlay */}
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>

    {/* Popup Modal */}
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm w-full relative min-h-[200px]">

        {/* Close Button */}
        <button
          onClick={() => close()}
          className="absolute top-3 right-3 text-white hover:text-white cursor-pointer text-2xl bg-red-500 p-1 rounded-md"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">
          You have an ongoing course. What would you like to do?
        </h2>
        <p className="mt-2 text-gray-300">React Basics (continue building?)</p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
          >
            Continue Draft
          </button>
          <button
            onClick={handleStartNew}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
